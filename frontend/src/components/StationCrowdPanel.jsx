import { densityColor } from "../utils/densityColor";

export default function StationCrowdPanel({ stationCode, crowd }) {
  if (!crowd) {
    return (
      <div className="p-4 rounded-xl bg-gray-100 text-gray-500">
        Crowd data not available
      </div>
    );
  }

  const level = crowd.overall_density || "UNKNOWN";
  const colorClass = densityColor[level] || densityColor.UNKNOWN;

  return (
    <div className={`p-6 rounded-xl shadow ${colorClass}`}>
      <h1 className="text-2xl font-bold mb-2">
        🚉 {stationCode} Station
      </h1>

      <p className="text-lg">
        Crowd Level:{" "}
        <span className="font-semibold">{level}</span>
      </p>

      <p className="text-sm opacity-70">
        Updated: {new Date(crowd.timestamp).toLocaleTimeString()}
      </p>
    </div>
  );
}
