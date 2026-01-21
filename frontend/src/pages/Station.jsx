import { useParams } from "react-router-dom";
import { useCrowdSocket } from "../hooks/useCrowdSocket";
import CoachCard from "../components/CoachCard";

export default function Station() {
  const { id } = useParams();
  const crowd = useCrowdSocket();
  const station = crowd[id];

  if (!station) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{id} Station</h1>
      <div className="grid grid-cols-3 gap-3">
        {Object.entries(station.coaches).map(([coach, data]) => (
          <CoachCard key={coach} coachId={coach} data={data} />
        ))}
      </div>
    </div>
  );
}
