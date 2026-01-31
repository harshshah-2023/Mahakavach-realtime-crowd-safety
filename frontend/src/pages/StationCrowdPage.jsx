import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StationHeatMap from "../components/StationHeatMap";

export default function StationCrowdPage() {
  const { stationCode } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://mahakavach-backend.onrender.com/api/v1/stations/${stationCode}/crowd`)
      .then(res => res.json())
      .then(setData);
  }, [stationCode]);

  if (!data) {
    return <div className="p-6 text-gray-500">Loading crowd…</div>;
  }

  return (
    <div className="p-6 pt-20">
      <h1 className="text-2xl font-bold mb-4">
        🚉 {stationCode} – Live Crowd Map
      </h1>

        <StationHeatMap density={data.overall_density} />

      <p className="text-xs text-gray-500 mt-3">
        Updated at {new Date(data.timestamp).toLocaleTimeString()}
      </p>
    </div>
  );
}
