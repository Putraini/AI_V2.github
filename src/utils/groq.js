import { Groq } from "groq-sdk";

const GROQ_API = import.meta.env.VITE_GROQ;

const groq = new Groq({
  apiKey: GROQ_API,
  dangerouslyAllowBrowser: true,
});

export const requestToGroqAI = async (content) => {
  try {
    const reply = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Anda adalah asisten AI yang selalu merespons dalam bahasa Indonesia.",
        },
        {
          role: "user",
          content,
        },
      ],
      model: "llama3-8b-8192",
    });
    return reply.choices[0].message.content;
  } catch (error) {
    console.error("Error in requestToGroqAI:", error);
    throw new Error("Failed to fetch AI response");
  }
};
