import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatPanel from "../components/ChatPanel";
import StatusPanel from "../components/StatusPanel";

export default function Community() {
  const [activeLine, setActiveLine] = useState(null);

  return (
    <div className="w-full h-screen flex overflow-hidden">
      <Sidebar activeLine={activeLine} setActiveLine={setActiveLine} />
      <ChatPanel activeLine={activeLine} />
      <StatusPanel activeLine={activeLine} />
    </div>
  );
}
