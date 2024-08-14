import React from "react";
import { GiSave } from "react-icons/gi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import ReactToPrint from "react-to-print";
import axios from "axios";
import logo from "../../public/sahabat_wibu.png";
const Sidebar: React.FC<{
  isOpen: boolean;
  toggleSidebar: () => void;
  chatRef: React.RefObject<HTMLDivElement>;
}> = ({ isOpen, toggleSidebar, chatRef }) => {
  const handleDeleteEverything = async () => {
    try {
      await axios.delete("http://127.0.0.1:8000/messages/");
      alert("All messages have been deleted.");
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete messages:", error);
      window.location.reload();
    }
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-sidebar p-4 z-50 transition-all duration-300 ease-in-out transform ${
        isOpen ? "w-64 translate-x-0" : "w-16 -translate-x-0"
      }`}
    >
      <div className="flex items-center ">
        <button
          type="button"
          className="text-lg text-secondary mb-4"
          onClick={toggleSidebar}
        >
          <FiMenu />
        </button>

        <img
          src={logo}
          alt="Logo"
          className={`w-8 h-8 ml-3 mb-4 object-contain transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <span
          className={`text-lg font-bold text-white ml-3 mb-4 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          TanyaSahabat
        </span>
      </div>
      {isOpen && (
        <div className="animate-fade">
          <ul className="mt-4">
            <li className="mb-1 group">
              <ReactToPrint
                trigger={() => (
                  <button className="flex items-center py-2 px-4 text-gray-300 hover:bg-sidebar_hover hover:text-sidebar_hover_text rounded-md w-full">
                    <GiSave />
                    <span className="text-sm ml-2">Save Memory</span>
                  </button>
                )}
                content={() => chatRef.current}
              />
            </li>
            <li className="mb-1 group">
              <button
                onClick={handleDeleteEverything}
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-sidebar_hover hover:text-sidebar_hover_text rounded-md w-full"
              >
                <MdOutlineDeleteForever />
                <span className="text-sm ml-2">Delete Everything</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
