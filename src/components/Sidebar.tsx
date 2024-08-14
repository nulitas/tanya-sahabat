import React from "react";
import { Link } from "react-router-dom";
import { CiChat1 } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";

const Sidebar: React.FC<{ isOpen: boolean; toggleSidebar: () => void }> = ({
  isOpen,
  toggleSidebar,
}) => {
  return (
    <div
      className={`fixed left-0 top-0 h-full bg-sidebar p-4 z-50 transition-all duration-300 ease-in-out transform ${
        isOpen ? "w-64 translate-x-0" : "w-16 -translate-x-0"
      }`}
    >
      <div className="flex items-center">
        <button
          type="button"
          className="text-lg text-secondary mb-4"
          onClick={toggleSidebar}
        >
          <FiMenu />
        </button>
        {isOpen && (
          <span className="text-lg font-bold text-white ml-3 animate-fade">
            TanyaSahabat
          </span>
        )}
      </div>
      {isOpen && (
        <div className="animate-fade">
          <ul className="mt-4">
            {["History Chat 1", "History Chat 2", "History Chat 3"].map(
              (chat, index) => (
                <li key={index} className="mb-1 group">
                  <Link
                    to={`/chat/${index + 1}`}
                    className="flex items-center py-2 px-4 text-gray-300 hover:bg-sidebar_hover hover:text-sidebar_hover_text rounded-md"
                  >
                    <CiChat1 />
                    <span className="text-sm ml-2">{chat}</span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
