import { useParams } from "react-router-dom";
import { useCrowdSocket } from "../hooks/useCrowdSocket";
import CoachCard from "../components/CoachCard";

export default function StationPage() {
  const { stationCode } = useParams();
  const { crowdData, lastUpdated } = useCrowdSocket();

  const station = crowdData?.[stationCode];

  if (!station) {
    return (
      <div className="p-6 text-gray-500">
        Loading live data for {stationCode}…
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">🚉 {stationCode}</h1>

        {lastUpdated && (
          <p className="text-sm text-gray-500">
            Last update: {new Date(lastUpdated).toLocaleTimeString()}
          </p>
        )}
      </div>

      <div className="mb-6">
        <span className="text-sm text-gray-600">Overall density:</span>
        <span className="ml-2 font-semibold">
          {station.overall_density}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(station.coaches).map(
          ([coachId, coachData]) => (
            <CoachCard
              key={coachId}
              coachId={coachId}
              data={coachData}
            />
          )
        )}
      </div>
    </div>
  );
}
