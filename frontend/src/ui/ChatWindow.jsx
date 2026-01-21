// ui/ChatWindow.jsx
import { useState } from "react";

export default function ChatWindow({ active, messages, onSend, onCrowd, isMobile, setActive }) {
  const [text, setText] = useState("");

  if (!active.station) {
    return (
      <div className="flex-1 flex justify-center items-center text-gray-500">
        Select a station to start chatting
      </div>
    );
  }

  const header = `${active.line} · ${active.route} · ${active.station}`;
  const today = new Date().toLocaleDateString();

  return (
    <div className="flex flex-col flex-1 h-full bg-gray-100">
      <div className="px-5 py-3 border-b border-gray-300 bg-white flex flex-col gap-1">
        {isMobile && (
          <button
            className="text-primary text-sm underline mb-1"
            onClick={() => setActive({ line: null, route: null, station: null })}
          >
            Back
          </button>
        )}
        <div className="font-semibold text-gray-900">{header}</div>
        <div className="text-xs text-gray-500">Active now: 42 commuters</div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        <div className="text-center text-xs text-gray-400">{today}</div>
        {messages.map((m, i) => (
          <Message key={i} m={m} />
        ))}
      </div>
      <div className="border-t border-gray-300 p-3 bg-white flex gap-2">
        <input
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-primary bg-white text-sm"
          placeholder="Send a message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (onSend(active.station, text), setText(""))}
        />
        <button onClick={() => { onSend(active.station, text); setText(""); }} className="bg-primary text-white px-4 py-2 rounded-lg text-sm">
          Send
        </button>
        <button onClick={onCrowd} className="border border-primary text-primary px-3 py-2 rounded-lg text-sm">
          Crowd
        </button>
      </div>
    </div>
  );
}

function Message({ m }) {
  const time = new Date(m.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (m.type === "system") {
    return (
      <div className="text-center text-xs text-gray-500 py-1">{m.text}</div>
    );
  }
  if (m.type === "crowd") {
    return (
      <div className="px-3 py-2 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="text-primary font-semibold text-sm">Crowd: {m.level}</div>
        {m.note && <div className="text-sm text-gray-700">{m.note}</div>}
        <div className="text-xs text-gray-500 mt-1">{time}</div>
      </div>
    );
  }
  return (
    <div className="px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm">
      <div className="text-sm text-gray-900">Commuter: {m.text}</div>
      <div className="text-xs text-gray-500 mt-1">{time}</div>
    </div>
  );
}
