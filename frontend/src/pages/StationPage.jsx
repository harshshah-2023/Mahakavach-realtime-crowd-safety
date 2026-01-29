import { useParams } from "react-router-dom";
import { useCrowdSocket } from "../hooks/useCrowdSocket";
import CoachCard from "../components/CoachCard";
import StationCardSkeleton from "../components/StationCardSkeleton";

export default function StationPage() {
  const { stationCode } = useParams();
  const { crowdData, lastUpdated } = useCrowdSocket();

  const station = crowdData?.[stationCode];
  const isLoading = !station;

  // if (!station) {
  //   return (
  //     <div className="p-6 text-gray-500">
  //       Loading live data for {stationCode}…
  //     </div>
  //   );
  // }

  return (
    <div className="p-6 pt-16">
      <div className="mb-4">
        <h1 className="text-2xl font-emirates">Station:  {stationCode}</h1>

        {lastUpdated && (
          <p className="text-sm text-gray-500">
            Last update: {new Date(lastUpdated).toLocaleTimeString()}
          </p>
        )}
      </div>

      {!isLoading && (
        <div className="mb-6">
          <span className="text-sm text-gray-600">Overall density:</span>
          <span className="ml-2 font-semibold">
            {station.overall_density}
          </span>
        </div>
      )}


     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isLoading ? (
          // Show skeleton loaders while data is fetching
          Array.from({ length: 8 }).map((_, index) => (
            <StationCardSkeleton key={index} />
          ))
        ) : (
          // Show actual data when loaded
          Object.entries(station.coaches).map(
            ([coachId, coachData]) => (
              <CoachCard
                key={coachId}
                coachId={coachId}
                data={coachData}
              />
            )
          )
        )}
      </div>
    </div>
  );
}
