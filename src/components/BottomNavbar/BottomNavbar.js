import React, { useState } from "react";
import { FaHome, FaQrcode, FaLock, FaSignal } from "react-icons/fa";

function BottomNavbar() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 lg:hidden rounded-t-lg ">
        <div className="flex justify-around py-2">
          {/* Home Button */}
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center border px-2 py-1 rounded-md ${
              activeTab === "home"
                ? "text-blue-500 border-blue-500"
                : "text-gray-500 border-gray-200"
            }`}
          >
            <FaHome className="text-2xl" />
            <span className="text-xs">Home</span>
          </button>

          {/* Scanner Button */}
          <button
            onClick={() => setActiveTab("scanner")}
            className={`flex flex-col items-center border px-2 py-1 rounded-md ${
              activeTab === "scanner"
                ? "text-blue-500 border-blue-500"
                : "text-gray-500 border-gray-200"
            }`}
          >
            <FaQrcode className="text-2xl" />
            <span className="text-xs">Scanner</span>
          </button>

          {/* Privacy Button */}
          <button
            onClick={() => setActiveTab("privacy")}
            className={`flex flex-col items-center border px-2 py-1 rounded-md ${
              activeTab === "privacy"
                ? "text-blue-500 border-blue-500"
                : "text-gray-500 border-gray-200"
            }`}
          >
            <FaLock className="text-2xl" />
            <span className="text-xs">Privacy</span>
          </button>

          {/* Offline Button */}
          <button
            onClick={() => setActiveTab("offline")}
            className={`flex flex-col items-center border px-2 py-1 rounded-md ${
              activeTab === "offline"
                ? "text-blue-500 border-blue-500"
                : "text-gray-500 border-gray-200"
            }`}
          >
            <FaSignal className="text-2xl" />
            <span className="text-xs">Offline</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default BottomNavbar;
