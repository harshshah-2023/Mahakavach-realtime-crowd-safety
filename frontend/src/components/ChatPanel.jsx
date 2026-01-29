import { useEffect, useState, useRef } from "react";
import { chatStore } from "../store/chatStore";
import MessageItem from "./MessageItem";
import Composer from "./Composer";
import { ArrowLeft } from "lucide-react";
import { LINES } from "../data/lines";

export default function ChatPanel({ activeLine, onBack }) {
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const lastMessageIdRef = useRef(null);

  useEffect(() => {
    if (!activeLine) return;

    const interval = setInterval(() => {
      const arr = chatStore.messages[activeLine] || [];
      const filtered = arr.filter((m) => Date.now() - m.ts < 30 * 60 * 1000);
      setMessages(filtered);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeLine]);

  // Only auto-scroll when there's an actual NEW message (not just re-render)
  useEffect(() => {
    if (messages.length === 0) return;
    
    const latestMessage = messages[messages.length - 1];
    const latestMessageId = latestMessage?.id;
    
    // Check if this is truly a new message
    if (latestMessageId && latestMessageId !== lastMessageIdRef.current) {
      // Check if user is near bottom
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
        
        // Only auto-scroll if user is within 150px of bottom
        if (distanceFromBottom < 150) {
          bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      }
      
      lastMessageIdRef.current = latestMessageId;
    }
  }, [messages]);

  // Reset when changing lines
  useEffect(() => {
    lastMessageIdRef.current = null;
    
    // Scroll to bottom when switching lines
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }, 50);
  }, [activeLine]);

  if (!activeLine) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a line to start chatting
      </div>
    );
  }

  const line = LINES.find((l) => l.id === activeLine);

  return (
    <div className="flex flex-col h-full bg-gray-100">

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b">
        <button onClick={onBack} className="sm:hidden">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="font-semibold">{line.name}</div>
          <div className="text-xs text-gray-500">
            Live commuter discussion
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
      >
        {messages.map((m) => (
          <MessageItem
            key={m.id}
            msg={m}
            onVote={() => chatStore.vote(activeLine, m.id)}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Composer */}
      <div className="shrink-0">
        <Composer onSend={(text) => {
          chatStore.send(activeLine, text);
          // Force scroll after sending
          setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }} />
      </div>
    </div>
  );
}