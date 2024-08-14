import React, { useState } from "react";
import ChatInput from "../components/ChatInput";
import { sendMessageToAPI } from "../api/ChatAPI";

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = async (message: string) => {
    setLoading(true);
    const userMessage = `You: ${message}`;
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const response = await sendMessageToAPI(message);

    if (response) {
      const assistantMessage = `Assistant: ${response.content}`;
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        "Assistant: Sorry, something went wrong.",
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-3xl mx-auto">
      <div className="flex-1 w-full overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            {msg}
          </div>
        ))}
      </div>
      <div className="absolute bottom-10 w-full sm:max-w-lg text-secondary px-4">
        <ChatInput onSendMessage={handleSendMessage} loading={loading} />
      </div>
    </div>
  );
};

export default Chat;
