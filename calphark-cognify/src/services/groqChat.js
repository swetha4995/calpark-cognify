const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

const FALLBACK_RESPONSES = [
  "Great question. Let us solve it in small steps.",
  "You are close. Try identifying what the question is really asking first.",
  "A quick strategy: write what is given, what is needed, then solve.",
  "Nice attempt. I can also give a shorter trick if you want.",
];

export async function getGroqChatReply(messages) {
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
        messages,
        temperature: 0.7,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      const fallback = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
      return fallback;
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
