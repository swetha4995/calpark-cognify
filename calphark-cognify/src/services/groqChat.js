const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const CHAT_SESSION_KEY = "cognify-chat-session-id";

const FALLBACK_RESPONSES = [
  "Great question. Let us solve it in small steps.",
  "You are close. Try identifying what the question is really asking first.",
  "A quick strategy: write what is given, what is needed, then solve.",
  "Nice attempt. I can also give a shorter trick if you want.",
];

export async function getGroqChatReply(messages) {
  const apiBaseUrl = String(import.meta.env.VITE_API_BASE_URL || "").trim().replace(/\/$/, "");
  const apiProxyEndpoint = `${apiBaseUrl}/api/chat`;

  let sessionId = "default";
  if (typeof window !== "undefined") {
    const existing = localStorage.getItem(CHAT_SESSION_KEY);
    if (existing) {
      sessionId = existing;
    } else {
      sessionId = `chat-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(CHAT_SESSION_KEY, sessionId);
    }
  }

  const normalized = (Array.isArray(messages) ? messages : [])
    .slice(-8)
    .map((msg) => ({
      role: msg?.role === "assistant" ? "assistant" : "user",
      content: String(msg?.content || "").trim(),
    }))
    .filter((msg) => msg.content.length > 0);

  if (!normalized.length) {
    return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
  }

  try {
    const proxyResponse = await fetch(apiProxyEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mode: "student",
        sessionId,
        messages: normalized,
      }),
    });

    if (proxyResponse.ok) {
      const proxyData = await proxyResponse.json();
      if (proxyData?.reply?.trim()) {
        return proxyData.reply.trim();
      }
    }
  } catch {
    // Ignore proxy errors and try local direct key fallback below.
  }

  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
  }

  try {
    const response = await fetch(GROQ_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: normalized,
        temperature: 0.7,
        max_tokens: 280,
      }),
    });

    if (!response.ok) {
      return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
    }

    const data = await response.json();
    return (
      data?.choices?.[0]?.message?.content?.trim() ||
      FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)]
    );
  } catch {
    return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
  }
}
