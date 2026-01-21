import { densityColor } from "../utils/densityColor";

export default function StationCard({ stationCode, station, onClick }) {
  const density = station?.overall_density || "UNKNOWN";
  const colorClass = densityColor[density] || densityColor.UNKNOWN;

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl shadow hover:shadow-lg transition p-4 ${colorClass}`}
    >
      {/* Station code */}
      <h2 className="text-lg font-semibold">{stationCode}</h2>

      {/* Density */}
      <p className="text-sm mt-1">
        Density: <span className="font-bold">{density}</span>
      </p>

      {/* Timestamp */}
      <p className="text-xs mt-2 opacity-70">
        Updated:{" "}
        {station?.timestamp
          ? new Date(station.timestamp).toLocaleTimeString()
          : "—"}
      </p>
    </div>
  );
}
