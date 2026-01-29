import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatPanel from "../components/ChatPanel";
import StatusPanel from "../components/StatusPanel";

export default function Community() {
  const [activeLine, setActiveLine] = useState(null);

  return (
    <div className="w-full h-[calc(100vh-80px)] pt-20 bg-gray-100 overflow-hidden">
      <div className="flex h-full">

        {/* Sidebar */}
        <div
          className={`
            w-full sm:w-72
            ${activeLine ? "hidden sm:block" : "block"}
          `}
        >
          <Sidebar
            activeLine={activeLine}
            setActiveLine={setActiveLine}
          />
        </div>

        {/* Chat */}
        <div
          className={`
            flex-1
            ${!activeLine ? "hidden sm:flex" : "flex"}
          `}
        >
          <ChatPanel
            activeLine={activeLine}
            onBack={() => setActiveLine(null)}
          />
        </div>

        {/* Status (Desktop only) */}
        <div className="hidden lg:block w-80">
          <StatusPanel activeLine={activeLine} />
        </div>

      </div>
    </div>
  );
}
