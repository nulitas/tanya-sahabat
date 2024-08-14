import React, { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export const SidebarLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative min-h-screen bg-primary_chat text-secondary animate-fade">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        chatRef={chatRef}
      />
      <div
        className={`relative transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64 md:ml-16" : "ml-16"
        }`}
      >
        <main className="p-6 min-h-[100vh]">
          <Outlet context={{ isSidebarOpen, chatRef }} />
        </main>
      </div>
    </div>
  );
};
