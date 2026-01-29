import { formatTime } from "../utils/time";

export default function MessageItem({ msg, onVote }) {
  const time = formatTime(msg.ts);

  /* SYSTEM MESSAGE */
  if (msg.type === "system") {
    return (
      <div className="flex justify-center my-2">
        <div className="px-4 py-1 rounded-full bg-gray-200 text-gray-600 text-xs italic">
          {msg.text} · {time}
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="max-w-[80%] sm:max-w-[65%] bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">

        {/* Message Text */}
        <div className="text-sm text-gray-900 leading-relaxed">
          {msg.text}
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between mt-1 text-[11px] text-gray-500">
          <span>{time}</span>

          <button
            onClick={onVote}
            className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 hover:text-primary transition"
            aria-label="Upvote message"
          >
            <span className="text-xs">▲</span>
            <span className="font-medium">{msg.votes}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
