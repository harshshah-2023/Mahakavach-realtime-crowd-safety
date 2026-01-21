import { useState } from "react";

export default function Composer({ onSend }) {
  const [text, setText] = useState("");

  return (
    <div className="border-t border-gray-300 p-3 bg-white flex gap-2">
      <input
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-primary text-sm"
        placeholder="Share an update… (auto-expires in 30 min)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && text.trim()) {
            onSend(text);
            setText("");
          }
        }}
      />
      <button
        disabled={!text.trim()}
        onClick={() => {
          onSend(text);
          setText("");
        }}
        className="bg-primary text-white px-4 py-2 rounded-lg text-sm disabled:opacity-40"
      >
        Send
      </button>
    </div>
  );
}
