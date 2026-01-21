import { useEffect, useState } from "react";
import { chatStore } from "../store/chatStore";
import MessageItem from "./MessageItem";
import Composer from "./Composer";

export default function ChatPanel({ activeLine }) {
  const [messages, setMessages] = useState([]);

  // Load / refresh messages (UI-only interval)
  useEffect(() => {
    if (!activeLine) return;
    
    const interval = setInterval(() => {
      const arr = chatStore.messages[activeLine] || [];
      // Filter out expired messages (30 min)
      const filtered = arr.filter((m) => Date.now() - m.ts < 30 * 60 * 1000);
      setMessages(filtered);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeLine]);

  const sendMessage = (text) => {
    // NOTE: Replace with WebSocket emit later
    chatStore.send(activeLine, text);
  };

  const voteMessage = (id) => {
    // NOTE: Replace with WebSocket event later
    chatStore.vote(activeLine, id);
  };

  if (!activeLine) {
    return <div className="flex-1 flex justify-center items-center text-gray-500">Select a line</div>;
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-gray-100">
        {messages.map((m) => (
          <MessageItem
            key={m.id}
            msg={m}
            onVote={() => voteMessage(m.id)}
          />
        ))}
      </div>
      <Composer onSend={sendMessage} />
    </div>
  );
}
