import { LINES } from "../data/lines";

export default function StatusPanel({ activeLine }) {
  if (!activeLine) {
    return (
      <div className="h-full border-l border-gray-200 bg-gray-50 hidden lg:flex items-center justify-center text-gray-400 text-sm">
        Status Panel
      </div>
    );
  }

  const line = LINES.find((l) => l.id === activeLine);

  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 hidden lg:flex flex-col p-4">
      
      <div className="font-semibold text-lg mb-1">{line.name}</div>
      <div className="text-sm text-gray-500 mb-4">Current Status</div>

      {/* Backend-driven status in future */}
      <div className="px-3 py-2 rounded-md bg-white border border-gray-200 mb-6">
        <span className="text-sm text-gray-700">Status:</span>
        <span className="ml-2 font-semibold text-primary">{line.status}</span>
      </div>

      {/* Future backend aggregation panels */}
      <div className="text-xs text-gray-500 tracking-wide uppercase mb-2">Pinned</div>
      <div className="bg-white border border-gray-200 rounded-md p-3 text-sm text-gray-500 italic">
        No pinned messages
      </div>
    </div>
  );
}
