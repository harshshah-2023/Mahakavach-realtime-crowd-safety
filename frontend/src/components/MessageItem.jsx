import { formatTime } from "../utils/time";

export default function MessageItem({ msg, onVote }) {
  const time = formatTime(msg.ts);

  // System messages (crowd alerts, info, etc.)
  if (msg.type === "system") {
    return (
      <div className="text-center text-xs text-gray-500 py-1 italic">
        {msg.text} — {time}
      </div>
    );
  }

  return (
    <div className="flex flex-col border border-gray-300 rounded-lg bg-white px-3 py-2 shadow-sm">
      <div className="text-sm text-gray-900">{msg.text}</div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{time}</span>
        <button
          onClick={onVote}
          className="hover:text-primary transition"
        >
          ▲ {msg.votes}
        </button>
      </div>
    </div>
  );
}
