import { LINES } from "../data/lines";

export default function Sidebar({ activeLine, setActiveLine }) {
  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col">

      {/* Header */}
      <div className="px-4 py-4 border-b font-semibold text-gray-800">
        Community Lines
      </div>

      {/* Lines */}
      <div className="flex-1 overflow-y-auto">
        {LINES.map((line) => (
          <button
            key={line.id}
            onClick={() => setActiveLine(line.id)}
            className={`w-full flex items-center px-4 py-4 text-left transition ${
              activeLine === line.id
                ? "bg-gray-900 text-white"
                : "hover:bg-gray-100 text-gray-800"
            }`}
          >
            <div className="flex-1">
              <div className="font-medium">{line.name}</div>
              <div className="text-xs text-gray-500">
                Live commuter chat
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
