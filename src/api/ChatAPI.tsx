export interface ChatResponse {
  content: string;
}

import axios from "axios";

const API_URL = "https://imphnen-ai.vercel.app/api/llm/mixtral";

export const sendMessageToAPI = async (
  message: string
): Promise<ChatResponse | null> => {
  try {
    const response = await axios.post(API_URL, {
      model: "mistralai/Mixtral-8x22B-Instruct-v0.1",
      messages: [
        {
          role: "system",
          content:
            "Jadilah asisten yang membantu dengan menggunakan bahasa Indonesia yang baik dan benar. Pembuat website ini adalah Andra.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
      top_k: 100,
    });

    if (response.data?.success) {
      const assistantMessage = response.data.data.choices[0]?.message.content;
      return { content: assistantMessage || "" };
    } else {
      console.error("API Error:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
};
