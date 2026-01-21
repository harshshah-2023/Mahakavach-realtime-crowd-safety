import { useNavigate } from "react-router-dom";
import { useCrowdSocket } from "../hooks/useCrowdSocket";
import StationCard from "../components/StationCard";

export default function Dashboard() {
  const { crowdData, lastUpdated } = useCrowdSocket();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">🚉 MahaKavach Dashboard</h1>

        {lastUpdated && (
          <span className="text-sm text-gray-500">
            Last update: {new Date(lastUpdated).toLocaleTimeString()}
          </span>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(crowdData || {}).map(([code, data]) => (
          <StationCard
            key={code}
            stationCode={code}
            station={data}
            onClick={() => navigate(`/station/${code}`)}
          />
        ))}
      </div>

      {/* Empty state */}
      {Object.keys(crowdData || {}).length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          Waiting for live crowd data…
        </p>
      )}
    </div>
  );
}
