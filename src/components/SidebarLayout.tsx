import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export const SidebarLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative min-h-screen bg-primary_chat text-secondary">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`relative transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64 md:ml-16" : "ml-16"
        }`}
      >
        <main className="p-6 min-h-[100vh]">
          <Outlet context={{ isSidebarOpen }} />
        </main>
      </div>
    </div>
  );
};
