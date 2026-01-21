// ui/TreeNav.jsx
import { useState } from "react";

const data = {
  "Harbour Line": {
    "Panvel → CSMT": ["Panvel", "Vashi", "Kurla", "CSMT"],
    "Vadala → Andheri": ["Vadala", "Bandra", "Andheri"],
  },
  "Central Line": {
    "Panvel → CSMT": ["Panvel", "Vashi", "Kurla", "CSMT"],
  },
  "Western Line": {
    "Virar → Churchgate": ["Virar", "Andheri", "Bandra", "Churchgate"],
  },
};

export default function TreeNav({ active, setActive }) {
  const [openLines, setOpenLines] = useState({});
  const [openRoutes, setOpenRoutes] = useState({});

  return (
    <div className="h-full overflow-y-auto py-4 space-y-2">
      {Object.keys(data).map((line) => (
        <div key={line} className="px-3">
          <button
            onClick={() => setOpenLines((o) => ({ ...o, [line]: !o[line] }))}
            className={`w-full text-left py-2 px-2 rounded transition ${
              active.line === line ? "bg-primary text-white" : "hover:bg-gray-100"
            }`}
          >
            {line}
          </button>
          {openLines[line] &&
            Object.keys(data[line]).map((route) => (
              <div key={route} className="ml-3 mt-1">
                <button
                  onClick={() => setOpenRoutes((o) => ({ ...o, [route]: !o[route] }))}
                  className={`w-full text-left py-2 px-2 rounded transition ${
                    active.route === route ? "bg-primary/10 text-primary" : "hover:bg-gray-100"
                  }`}
                >
                  {route}
                </button>
                {openRoutes[route] &&
                  data[line][route].map((station) => (
                    <div key={station} className="ml-4 mt-1">
                      <button
                        onClick={() => setActive({ line, route, station })}
                        className={`w-full text-left py-2 px-2 rounded transition ${
                          active.station === station ? "bg-primary text-white" : "hover:bg-gray-100"
                        }`}
                      >
                        {station}
                      </button>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
