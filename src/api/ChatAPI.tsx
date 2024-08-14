import axios from "axios";

const API_URL = "https://imphnen-ai.vercel.app/api/llm/mixtral";

interface ChatResponse {
  content: string;
}

export const sendMessageToAPI = async (
  message: string
): Promise<ChatResponse | null> => {
  try {
    const response = await axios.post(API_URL, {
      prompt: message,
      max_tokens: 350,
    });

    if (response.data && response.data.success) {
      const assistantMessage = response.data.data.choices[0].message.content;
      return { content: assistantMessage };
    } else {
      console.error("API Error:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
};
