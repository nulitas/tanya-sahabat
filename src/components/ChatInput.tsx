import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  loading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, loading }) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>
      <div className="flex items-center bg-[#1C1C1C] text-[#A3A3A3] rounded-full px-4 py-2 w-full max-w-lg">
        <textarea
          id="chat"
          rows={1}
          className="bg-transparent outline-none text-white w-full placeholder-[#A3A3A3] resize-none"
          placeholder="Enter a prompt here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="inline-flex justify-center p-2 text-[#A3A3A3] rounded-full cursor-pointer hover:bg-[#2D2D2D] hover:text-white"
          disabled={loading}
        >
          <AiOutlineSend className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
