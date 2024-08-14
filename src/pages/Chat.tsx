import React, { useState, useEffect, useRef } from "react";
import ChatInput from "../components/ChatInput";
import { sendMessageToAPI } from "../api/ChatAPI";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { TailSpin } from "react-loader-spinner";
import assistantPfp from "../../public/sahabat_wibu.png";
import userPfp from "../../public/sahabat_ai.png";

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [showExamples, setShowExamples] = useState<boolean>(true);
  const chatRef = useRef<HTMLDivElement>(null);

  const exampleQuestions = ["Siapakah yang membuat website ini?"];

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/messages/");
        setMessages(response.data);
        if (response.data.length > 0) {
          setShowExamples(false);
        }
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

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message },
    ]);

    await saveMessageToDB("user", message);

    const response = await sendMessageToAPI(message);

    if (response) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: response.content },
      ]);
      await saveMessageToDB("assistant", response.content);
    } else {
      const errorMessage = "Maaf, sepertinya ada kesalahan.";
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: errorMessage },
      ]);
      await saveMessageToDB("assistant", errorMessage);
    }

    setLoading(false);
    setShowExamples(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleExampleClick = (question: string) => {
    setInputText(question);
    setShowExamples(false);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        chatRef={chatRef}
      />
      <div
        className={`flex flex-col items-center p-4 w-full md:max-w-3xl mx-auto transition-opacity duration-300 flex-1 ${
          isSidebarOpen ? "hidden md:flex" : ""
        }`}
      >
        <div className="flex-1 w-full overflow-y-auto mb-4" ref={chatRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-6 flex items-center ${
                msg.role === "user" ? "justify-start" : "justify-end"
              }`}
            >
              {msg.role === "user" ? (
                <img
                  src={userPfp}
                  alt="User"
                  className="w-8 h-8 mr-2 sm:w-10 sm:h-10"
                />
              ) : (
                <img
                  src={assistantPfp}
                  alt="Assistant"
                  className="w-8 h-8 mr-2 sm:w-10 sm:h-10"
                />
              )}
              <div
                className={`p-2 rounded-lg max-w-[80%] text-white ${
                  msg.role === "user" ? "bg-blue-500" : "bg-gray-700"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-center items-center mt-4">
              <TailSpin height={25} width={25} color="white" />
            </div>
          )}
        </div>

        {showExamples && messages.length === 0 && (
          <div className="mb-4 transition-opacity duration-500 ease-in-out fade-in w-full">
            {exampleQuestions.map((question, index) => (
              <div
                key={index}
                className="p-2 mb-2 cursor-pointer bg-sidebar hover:bg-text_input_hover duration-200 ease-in-out rounded animate-fade"
                onClick={() => handleExampleClick(question)}
              >
                {question}
              </div>
            ))}
          </div>
        )}

        <div className="absolute bottom-10 w-full sm:max-w-lg text-secondary px-4">
          <ChatInput
            onSendMessage={handleSendMessage}
            loading={loading}
            inputText={inputText}
            setInputText={setInputText}
            setShowExamples={setShowExamples}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
