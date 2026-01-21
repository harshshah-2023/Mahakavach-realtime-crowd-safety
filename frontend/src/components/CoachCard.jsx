import { densityColor } from "../utils/densityColor";

export default function CoachCard({ coachId, data }) {
  const colorClass = densityColor[data.density] || densityColor.UNKNOWN;

  return (
    <div className={`p-3 rounded-xl text-white ${colorClass}`}>
      <h3 className="font-semibold">{coachId}</h3>
      <p className="text-sm">Density: {data.density}</p>
      <p className="text-xs opacity-80">Trend: {data.trend}</p>
    </div>
  );
}
