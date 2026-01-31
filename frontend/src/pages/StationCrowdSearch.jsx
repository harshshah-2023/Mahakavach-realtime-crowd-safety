import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StationCrowdSearch() {
  const [station, setStation] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!station.trim()) return;
    navigate(`/station-crowd/${station.toUpperCase()}`);
  };

  return (
    <div className="p-6 max-w-md mx-auto pt-20">
      <h1 className="text-2xl font-bold mb-4">
        🚉 Check Station Crowd
      </h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter station code (e.g. PNVL)"
          value={station}
          onChange={(e) => setStation(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none"
        />

        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Search
        </button>
      </div>
    </div>
  );
}
