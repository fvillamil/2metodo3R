import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getGeminiResponse(input: string, history: Message[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(msg => ({
          role: msg.role === 'model' ? 'model' : 'user',
          parts: [{ text: msg.text }],
        })),
        { role: 'user', parts: [{ text: input }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });

    return { text: response.text || "Lo siento, no pude procesar tu mensaje." };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "Lo siento, mujer poderosa. Hubo un pequeño error en mi conexión. ¿Podrías repetirme eso? ❤️" };
  }
}
