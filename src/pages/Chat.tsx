import React from "react";
import { useOutletContext } from "react-router-dom";
import ChatInput from "../components/ChatInput";
import { AiOutlineEdit } from "react-icons/ai";
import { RiLightbulbLine } from "react-icons/ri";

interface ChatProps {
  isSidebarOpen: boolean;
}

export const Chat: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<ChatProps>();

  const exampleQuestions = [
    {
      text: "Bantu saya merencanakan malam permainan dengan 5 teman dengan harga di bawah $100",
      icon: <AiOutlineEdit />,
    },
    {
      text: "Curah pendapat ide presentasi tentang suatu topik",
      icon: <AiOutlineEdit />,
    },
    {
      text: "Buat draf email ke perekrut untuk menerima tawaran pekerjaan",
      icon: <AiOutlineEdit />,
    },
    {
      text: "Jelaskan apa itu diet keto secara sederhana",
      icon: <RiLightbulbLine />,
    },
  ];

  const [selectedQuestion, setSelectedQuestion] = React.useState<string>("");

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question);
  };

  return (
    <div
      className={`flex flex-col items-center p-4 max-w-3xl mx-auto transition-opacity duration-300 ${
        isSidebarOpen ? "hidden  md:flex" : ""
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 w-full">
        {exampleQuestions.map((question, index) => (
          <div
            key={index}
            onClick={() => handleQuestionClick(question.text)}
            className="cursor-pointer bg-[#1C1C1C] text-white p-4 rounded-lg flex justify-between items-center shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <span className="text-sm">{question.text}</span>
            <span className="ml-4 text-lg text-[#A3A3A3]">{question.icon}</span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-10 w-full sm:max-w-lg text-secondary px-4">
        <ChatInput initialMessage={selectedQuestion} />
      </div>
    </div>
  );
};

export default Chat;
