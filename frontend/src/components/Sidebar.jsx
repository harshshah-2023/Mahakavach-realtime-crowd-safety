import { LINES } from "../data/lines";

export default function Sidebar({ activeLine, setActiveLine }) {
  return (
    <div className="h-full overflow-y-auto py-4 bg-gray-50 border-r border-gray-200">
      <div className="px-3 mb-3 text-xs font-semibold text-gray-500">LINES</div>
      
      {LINES.map((line) => (
        <button
          key={line.id}
          onClick={() => setActiveLine(line.id)}
          className={`w-full text-left px-4 py-3 rounded-md mb-1 font-medium transition ${
            activeLine === line.id
              ? "bg-gray-900 text-white"
              : "text-gray-800 hover:bg-gray-200"
          }`}
        >
          {line.name}
        </button>
      ))}
    </div>
  );
}
