const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const GEMINI_GENERATE_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent";
const GEMINI_EMBED_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent";

const DEFAULT_GROQ_MODEL = "llama-3.3-70b-versatile";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const MAX_SESSION_MAP_SIZE = 200;
const DEFAULT_MAX_MESSAGES = 8;
const DEFAULT_MAX_INPUT_TOKENS = 1200;
const DEFAULT_MAX_OUTPUT_TOKENS = 220;
const EMBED_CACHE_MAX = 700;
const DEFAULT_EMBED_DOC_CHAR_LIMIT = 1200;
const DEFAULT_EMBED_PREFILTER_LIMIT = 8;
const DEFAULT_RAG_TOP_K = 3;
const DEFAULT_MIN_CONTEXT_SCORE = 0.08;

const SESSION_STATE = new Map();
const EMBEDDING_CACHE = new Map();

function getEnvNumber(name, fallback) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function estimateTokens(text) {
  return Math.ceil(String(text || "").length / 4);
}

function cleanText(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function getSessionState(sessionId) {
  const key = String(sessionId || "default").slice(0, 120);
  if (!SESSION_STATE.has(key)) {
    if (SESSION_STATE.size >= MAX_SESSION_MAP_SIZE) {
      const firstKey = SESSION_STATE.keys().next().value;
      SESSION_STATE.delete(firstKey);
    }
    SESSION_STATE.set(key, {
      lockUserNumber: null,
      lockUserName: null,
      lastQueryHash: null,
      repeatCount: 0,
      clarificationCount: 0,
      summary: "",
    });
  }
  return SESSION_STATE.get(key);
}

function getOrSetEmbeddingCache(key, valueFactory) {
  if (EMBEDDING_CACHE.has(key)) {
    const cached = EMBEDDING_CACHE.get(key);
    EMBEDDING_CACHE.delete(key);
    EMBEDDING_CACHE.set(key, cached);
    return Promise.resolve(cached);
  }

  return valueFactory().then((value) => {
    if (EMBEDDING_CACHE.size >= EMBED_CACHE_MAX) {
      const firstKey = EMBEDDING_CACHE.keys().next().value;
      EMBEDDING_CACHE.delete(firstKey);
    }
    EMBEDDING_CACHE.set(key, value);
    return value;
  });
}

function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .map((m) => {
      const role = m?.role === "assistant" ? "assistant" : m?.role === "user" ? "user" : null;
      const content = cleanText(m?.content);
      if (!role || !content) return null;
      return { role, content };
    })
    .filter(Boolean);
}

function trimMessagesByBudget(messages, maxMessages, maxInputTokens) {
  const limited = messages.slice(-Math.max(1, maxMessages));
  const picked = [];
  let used = 0;
  for (let i = limited.length - 1; i >= 0; i -= 1) {
    const msg = limited[i];
    const t = estimateTokens(msg.content);
    if (picked.length > 0 && used + t > maxInputTokens) break;
    picked.push(msg);
    used += t;
  }
  return picked.reverse();
}

function compactMessageHistory(messages) {
  const compacted = [];
  let seenClarification = false;

  for (const msg of messages) {
    if (
      msg.role === "assistant" &&
      /(?:which user|user number|user name|specify (?:the )?user|share (?:the )?user)/i.test(msg.content)
    ) {
      if (seenClarification) continue;
      seenClarification = true;
    }
    compacted.push(msg);
  }

  return compacted;
}

function extractConstraints(text) {
  const normalized = String(text || "");
  const numberMatch = normalized.match(
    /(?:\b(?:user|student)\b\s*(?:id|no|number)?\s*[:#=\-]?\s*)(\d{1,10})|(?:\bfor\s+user\s+)(\d{1,10})/i,
  );
  const usernameMatch = normalized.match(
    /(?:username|user\s*name)\s*[:=\-]?\s*([a-zA-Z0-9_.-]{2,40})|(?:\bfor\s+user\s+)([a-zA-Z][a-zA-Z0-9_.-]{1,39})/i,
  );
  const wantsReport = /\b(report|summary|performance|result|analytics)\b/i.test(normalized);
  const wantsUserSwitch = /\b(change|switch|use|set)\b.{0,30}\buser\b/i.test(normalized);

  return {
    userNumber: numberMatch?.[1] || numberMatch?.[2] || null,
    userName: usernameMatch?.[1] || usernameMatch?.[2] || null,
    wantsReport,
    wantsUserSwitch,
  };
}

function resolveActiveConstraints(state, constraints) {
  return {
    userNumber: constraints.userNumber || state.lockUserNumber || null,
    userName: constraints.userName || state.lockUserName || null,
    wantsReport: constraints.wantsReport,
  };
}

function filterDocsByActiveUser(docs, activeConstraints) {
  if (!Array.isArray(docs) || docs.length === 0) return [];

  const hasNumber = Boolean(activeConstraints.userNumber);
  const hasName = Boolean(activeConstraints.userName);

  if (!hasNumber && !hasName) return docs;

  const numberNeedle = String(activeConstraints.userNumber || "").toLowerCase();
  const nameNeedle = String(activeConstraints.userName || "").toLowerCase();

  const filtered = docs.filter((doc) => {
    const text = cleanText(doc?.text || doc?.content || "").toLowerCase();
    const metaRaw = doc?.meta || doc?.metadata || {};
    const meta = JSON.stringify(metaRaw).toLowerCase();

    const numberMatch = hasNumber ? text.includes(numberNeedle) || meta.includes(numberNeedle) : true;
    const nameMatch = hasName ? text.includes(nameNeedle) || meta.includes(nameNeedle) : true;

    return numberMatch && nameMatch;
  });

  return filtered.length ? filtered : docs;
}

function lexicalScore(query, text) {
  const q = new Set(cleanText(query).toLowerCase().split(" ").filter((w) => w.length > 2));
  const t = new Set(cleanText(text).toLowerCase().split(" ").filter((w) => w.length > 2));
  if (!q.size || !t.size) return 0;
  let overlap = 0;
  q.forEach((w) => {
    if (t.has(w)) overlap += 1;
  });
  return overlap / q.size;
}

function dot(a, b) {
  let s = 0;
  for (let i = 0; i < a.length; i += 1) s += a[i] * b[i];
  return s;
}

function norm(a) {
  return Math.sqrt(dot(a, a));
}

function cosine(a, b) {
  const n = norm(a) * norm(b);
  if (!n) return 0;
  return dot(a, b) / n;
}

async function geminiEmbed(text, geminiApiKey) {
  const cleaned = cleanText(text);
  const cacheKey = `${cleaned.slice(0, 160)}::${cleaned.length}`;

  return getOrSetEmbeddingCache(cacheKey, async () => {
    const response = await fetch(`${GEMINI_EMBED_ENDPOINT}?key=${encodeURIComponent(geminiApiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "models/text-embedding-004",
        content: { parts: [{ text: cleaned }] },
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || "Gemini embedding failed");
    }
    const values = data?.embedding?.values;
    if (!Array.isArray(values) || values.length === 0) {
      throw new Error("Gemini embedding values missing");
    }
    return values;
  });
}

async function retrieveContext({ query, docs, geminiApiKey, activeConstraints }) {
  if (!Array.isArray(docs) || docs.length === 0) {
    return { hits: [], method: "none" };
  }

  const filteredDocs = filterDocsByActiveUser(docs, activeConstraints);

  const normalizedDocs = filteredDocs
    .map((d, index) => ({
      id: d?.id || `doc-${index + 1}`,
      text: cleanText(d?.text || d?.content || ""),
      meta: d?.meta || d?.metadata || {},
    }))
    .filter((d) => d.text);

  if (!normalizedDocs.length) {
    return { hits: [], method: "none" };
  }

  const prefilterLimit = getEnvNumber("CHAT_EMBED_PREFILTER_LIMIT", DEFAULT_EMBED_PREFILTER_LIMIT);
  const embedDocCharLimit = getEnvNumber("CHAT_EMBED_DOC_CHAR_LIMIT", DEFAULT_EMBED_DOC_CHAR_LIMIT);
  const topK = getEnvNumber("CHAT_RAG_TOP_K", DEFAULT_RAG_TOP_K);
  const minContextScore = Number(process.env.CHAT_MIN_CONTEXT_SCORE || DEFAULT_MIN_CONTEXT_SCORE);

  const lexicalRanked = normalizedDocs
    .map((d) => ({
      ...d,
      lexical: lexicalScore(query, d.text),
    }))
    .sort((a, b) => b.lexical - a.lexical);

  const lexicalTop = lexicalRanked.slice(0, Math.max(1, prefilterLimit));

  try {
    if (!geminiApiKey) throw new Error("No Gemini key for embeddings");
    const queryVector = await geminiEmbed(query, geminiApiKey);
    const scored = await Promise.all(
      lexicalTop.map(async (d) => {
        const docVector = await geminiEmbed(d.text.slice(0, Math.max(300, embedDocCharLimit)), geminiApiKey);
        const semantic = cosine(queryVector, docVector);
        return {
          ...d,
          score: semantic * 0.8 + d.lexical * 0.2,
        };
      }),
    );

    scored.sort((a, b) => b.score - a.score);
    const hits = scored.filter((d) => d.score >= minContextScore).slice(0, Math.max(1, topK));
    return { hits, method: "gemini-embedding" };
  } catch {
    const scored = lexicalRanked.slice(0, Math.max(1, topK)).map((d) => ({ ...d, score: d.lexical }));
    return { hits: scored, method: "lexical-fallback" };
  }
}

function formatRetrievedContext(retrieval) {
  if (!retrieval?.hits?.length) return "";
  return retrieval.hits
    .map((hit, idx) => {
      const metaText = hit.meta && Object.keys(hit.meta).length ? ` meta=${JSON.stringify(hit.meta)}` : "";
      return `[Context ${idx + 1}] id=${hit.id} score=${hit.score.toFixed(3)}${metaText}\n${hit.text.slice(0, 420)}`;
    })
    .join("\n\n");
}

function buildSystemPrompt({ mode, state, activeConstraints, retrievedContext }) {
  const roleHeader =
    mode === "counsellor"
      ? "You are an empathetic AI counsellor for students."
      : "You are a high-clarity AI study mentor for students.";

  const style =
    mode === "counsellor"
      ? [
          "Use warm, practical language and avoid overwhelming detail.",
          "Give concise support with one short check-in question at most.",
        ]
      : [
          "Give concise, accurate, action-first answers.",
          "Keep formatting minimal and easy to scan.",
        ];

  const lockLine = state.lockUserNumber
    ? `Locked user number: ${state.lockUserNumber}. Do not suggest other user identities unless explicitly asked to change.`
    : "No locked user number yet.";

  const constraintsLine = `Active constraints: userNumber=${activeConstraints.userNumber || "none"}, userName=${activeConstraints.userName || "none"}, wantsReport=${activeConstraints.wantsReport}.`;

  const retrievalRules = [
    "If context is provided, ground your answer in that context.",
    "If the requested value is not in context, say it clearly and ask only one focused follow-up.",
    "Never ask for user details again when active constraints already contain userNumber or userName.",
    "Never fabricate database values.",
  ];

  const outputPolicy = [
    "Max 90 words unless user asks for details.",
    "Do not dump raw data or unused fields.",
    "For reports: output only key metrics and one short recommendation.",
  ];

  return [
    roleHeader,
    ...style,
    lockLine,
    constraintsLine,
    ...retrievalRules,
    ...outputPolicy,
    retrievedContext ? `Retrieved Context:\n${retrievedContext}` : "Retrieved Context: none",
  ].join("\n");
}

function hashText(text) {
  let h = 0;
  const s = String(text || "");
  for (let i = 0; i < s.length; i += 1) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return String(h);
}

function updateSessionState(state, userText, constraints) {
  if (constraints.wantsUserSwitch && !constraints.userNumber && !constraints.userName) {
    state.lockUserNumber = null;
    state.lockUserName = null;
  }

  if (constraints.userNumber) state.lockUserNumber = constraints.userNumber;
  if (constraints.userName) state.lockUserName = constraints.userName;

  const currentHash = hashText(userText);
  if (state.lastQueryHash === currentHash) {
    state.repeatCount += 1;
  } else {
    state.repeatCount = 0;
  }
  state.lastQueryHash = currentHash;
}

function maybeCreateClarificationReply({ latestUserMessage, activeConstraints, state }) {
  const text = cleanText(latestUserMessage).toLowerCase();
  if (!text) return null;

  const asksReport = /\b(report|summary|performance|result|analytics)\b/i.test(text);
  if (!asksReport) return null;

  if (activeConstraints.userNumber || activeConstraints.userName) {
    state.clarificationCount = 0;
    return null;
  }

  state.clarificationCount += 1;
  if (state.clarificationCount > 1) {
    return "Please share either the user number or exact username once, and I will generate the report immediately.";
  }

  return "Please share the user number or exact username for the report.";
}

async function callGemini({ geminiApiKey, geminiModel, systemPrompt, messages, maxOutputTokens }) {
  if (!geminiApiKey) {
    throw new Error("Gemini API key missing");
  }

  const endpoint = GEMINI_GENERATE_ENDPOINT.replace("{model}", geminiModel || DEFAULT_GEMINI_MODEL);
  const response = await fetch(`${endpoint}?key=${encodeURIComponent(geminiApiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        temperature: 0.3,
        topP: 0.9,
        maxOutputTokens,
      },
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || "Gemini chat failed");
  }

  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((p) => p?.text || "")
      .join("\n")
      .trim() || "";

  if (!text) {
    throw new Error("Gemini returned empty text");
  }

  return { reply: text, provider: "gemini" };
}

async function callGroq({ groqApiKey, groqModel, systemPrompt, messages, maxOutputTokens }) {
  if (!groqApiKey) {
    throw new Error("Groq API key missing");
  }

  const response = await fetch(GROQ_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${groqApiKey}`,
    },
    body: JSON.stringify({
      model: groqModel || DEFAULT_GROQ_MODEL,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.3,
      max_tokens: maxOutputTokens,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || "Groq chat failed");
  }

  const text = data?.choices?.[0]?.message?.content?.trim() || "";
  if (!text) {
    throw new Error("Groq returned empty text");
  }

  return { reply: text, provider: "groq" };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GEMINI_KEY;
  const groqApiKey = process.env.GROQ_API_KEY || process.env.GROQ_API || process.env.VITE_GROQ_API_KEY;

  if (!geminiApiKey && !groqApiKey) {
    return res.status(500).json({
      error: "Neither Gemini nor Groq API keys are configured",
    });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const mode = body.mode === "counsellor" ? "counsellor" : "student";
    const sessionId = cleanText(body.sessionId || "default");
    const messages = compactMessageHistory(sanitizeMessages(body.messages));
    const docs = Array.isArray(body.documents) ? body.documents : [];

    if (!messages.length) {
      return res.status(400).json({ error: "messages must be a non-empty array" });
    }

    const maxMessages = getEnvNumber("CHAT_MAX_MESSAGES", DEFAULT_MAX_MESSAGES);
    const maxInputTokens = getEnvNumber("CHAT_MAX_INPUT_TOKENS", DEFAULT_MAX_INPUT_TOKENS);
    const maxOutputTokens = getEnvNumber("CHAT_MAX_OUTPUT_TOKENS", DEFAULT_MAX_OUTPUT_TOKENS);

    const trimmed = trimMessagesByBudget(messages, maxMessages, maxInputTokens);
    const latestUserMessage = [...trimmed].reverse().find((m) => m.role === "user")?.content || "";

    const state = getSessionState(sessionId);
    const constraints = extractConstraints(latestUserMessage);
    updateSessionState(state, latestUserMessage, constraints);
    const activeConstraints = resolveActiveConstraints(state, constraints);

    const clarificationReply = maybeCreateClarificationReply({
      latestUserMessage,
      activeConstraints,
      state,
    });

    if (clarificationReply) {
      return res.status(200).json({
        reply: clarificationReply,
        provider: "router",
        retrievalMethod: "none",
        appliedUserLock: state.lockUserNumber || null,
        fallbackReason: null,
      });
    }

    const retrieval = await retrieveContext({
      query: latestUserMessage,
      docs,
      geminiApiKey,
      activeConstraints,
    });

    const retrievedContext = formatRetrievedContext(retrieval);
    const systemPrompt = buildSystemPrompt({
      mode,
      state,
      activeConstraints,
      retrievedContext,
    });

    let result;
    try {
      result = await callGemini({
        geminiApiKey,
        geminiModel: process.env.GEMINI_CHAT_MODEL || DEFAULT_GEMINI_MODEL,
        systemPrompt,
        messages: trimmed,
        maxOutputTokens,
      });
    } catch (geminiError) {
      result = await callGroq({
        groqApiKey,
        groqModel: process.env.GROQ_CHAT_MODEL || DEFAULT_GROQ_MODEL,
        systemPrompt,
        messages: trimmed,
        maxOutputTokens,
      });
      result.fallbackReason = geminiError?.message || "gemini_failed";
    }

    return res.status(200).json({
      reply: result.reply,
      provider: result.provider,
      retrievalMethod: retrieval.method,
      appliedUserLock: state.lockUserNumber || null,
      fallbackReason: result.fallbackReason || null,
    });
  } catch (error) {
    return res.status(500).json({
      error: error?.message || "Internal Server Error",
    });
  }
}
