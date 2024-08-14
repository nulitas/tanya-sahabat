import React, { useState, useEffect, useRef } from "react";
import ChatInput from "../components/ChatInput";
import { sendMessageToAPI } from "../api/ChatAPI";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/messages/");
        const chatHistory = response.data.map(
          (msg: { role: string; content: string }) =>
            `${msg.role === "user" ? "You" : "Assistant"}: ${msg.content}`
        );
        setMessages(chatHistory);
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
      }
    };

    fetchChatHistory();
  }, []);

  const saveMessageToDB = async (role: string, content: string) => {
    try {
      await axios.post("http://127.0.0.1:8000/messages/", {
        role,
        content,
      });
    } catch (error) {
      console.error("Failed to save message to database:", error);
    }
  };

  const handleSendMessage = async (message: string) => {
    setLoading(true);
    const userMessage = `You: ${message}`;
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    await saveMessageToDB("user", message);

    const response = await sendMessageToAPI(message);

    if (response) {
      const assistantMessage = `Assistant: ${response.content}`;
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

      await saveMessageToDB("assistant", response.content);
    } else {
      const errorMessage = "Assistant: Sorry, something went wrong.";
      setMessages((prevMessages) => [...prevMessages, errorMessage]);

      await saveMessageToDB("assistant", "Sorry, something went wrong.");
    }

    setLoading(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        chatRef={chatRef}
      />
      <div
        className={`flex flex-col items-center p-4 max-w-3xl mx-auto transition-opacity duration-300 flex-1 ${
          isSidebarOpen ? "hidden md:flex" : ""
        }`}
      >
        <div className="flex-1 w-full overflow-y-auto mb-4" ref={chatRef}>
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
    </div>
  );
};

export default Chat;
