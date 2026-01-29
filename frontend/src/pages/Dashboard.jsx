import { useNavigate } from "react-router-dom";
import { useCrowdSocket } from "../hooks/useCrowdSocket";
import StationCard from "../components/StationCard";
import StationCardSkeleton from "../components/StationCardSkeleton";

export default function Dashboard() {
  const { crowdData, lastUpdated } = useCrowdSocket();
  const navigate = useNavigate();
  const isLoading = !crowdData || Object.keys(crowdData).length === 0;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className=" font-emirates text-2xl font-bold">Crows Status of all stations</h1>

        {lastUpdated && (
          <span className="text-sm text-gray-500">
            Last update: {new Date(lastUpdated).toLocaleTimeString()}
          </span>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isLoading ? (
          // Show skeleton loaders while data is fetching
          Array.from({ length: 8 }).map((_, index) => (
            <StationCardSkeleton key={index} />
          ))
        ) : (
          // Show actual data when loaded
          Object.entries(crowdData).map(([code, data]) => (
            <StationCard
              key={code}
              stationCode={code}
              station={data}
              onClick={() => navigate(`/station/${code}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
