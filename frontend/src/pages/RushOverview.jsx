import { useNavigate } from "react-router-dom";
import { getRushStatus } from "../utils/rushLogic";

const LINES = [
  {
    id: "central",
    name: "Central Line",
    description: "CST · Dadar · Thane · Kalyan · Kasara",
  },
  {
    id: "harbour",
    name: "Harbour Line",
    description: "CST · Wadala · Kurla · Vashi · Panvel",
  },
  {
    id: "western",
    name: "Western Line",
    description: "Churchgate · Bandra · Andheri · Borivali · Virar",
  },
];

export default function RushOverview() {
  const navigate = useNavigate();
  const rush = getRushStatus();

  return (
    <div className="w-full bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* HERO HEADER */}
        <div className="mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-gray-500">
            Network Status
          </span>

          <h1 className="font-emirates text-4xl md:text-5xl text-dark mt-4 mb-6">
            Mumbai Suburban Rush Overview
          </h1>

          <div className="max-w-3xl flex flex-col gap-4">
            <p className="text-gray-600 leading-relaxed">
              Real-time congestion intelligence derived from commuter movement
              patterns and peak-hour analysis across Mumbai’s suburban rail corridors.
            </p>

            {/* Global Status Strip */}
            <div className="inline-flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm w-fit">
              <span className="text-sm text-gray-700 font-medium">
                Network Condition
              </span>
              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold text-white ${rush.color}`}
              >
                {rush.level}
              </span>
            </div>
          </div>
        </div>

        {/* LINE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {LINES.map((line) => (
            <button
              key={line.id}
              onClick={() => navigate(`/rush-hours/${line.id}`)}
              className="group relative bg-white border border-gray-200 rounded-2xl p-7 text-left shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              {/* Accent Rail */}
              <div
                className={`absolute left-0 top-0 h-full w-[3px] rounded-l-2xl ${rush.color}`}
              />

              {/* Header */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-dark mb-2">
                  {line.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Suburban Corridor
                </p>
              </div>

              {/* Route */}
              <div className="mb-8">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {line.description}
                </p>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${rush.color}`}
                  />
                  <span className="text-sm text-gray-600">
                    Current congestion
                  </span>
                </div>

                <span className="text-sm font-medium text-primary group-hover:underline">
                  View details
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* CROWD LEGEND */}
        <div className="mt-20">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-dark mb-6">
              Crowd Level Index
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <span className="w-3 h-3 rounded-full bg-red-600 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-dark">
                    Rush Hour
                  </p>
                  <p className="text-sm text-gray-600">
                    Heavy crowd, limited standing space
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-3 h-3 rounded-full bg-yellow-400 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-dark">
                    Moderate
                  </p>
                  <p className="text-sm text-gray-600">
                    Manageable crowd, short waits
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-3 h-3 rounded-full bg-green-600 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-dark">
                    Non-Rush
                  </p>
                  <p className="text-sm text-gray-600">
                    Comfortable movement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
