// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function StationTrainsPage() {
//   const { stationCode } = useParams();
//   const [trains, setTrains] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(
//       `https://mahakavach-backend.onrender.com/api/v1/stations/${stationCode}/trains`
//     )
//     // (
//     //   `http://127.0.0.1:8000/api/v1/stations/${stationCode}/trains`
//     // )
//       .then(res => res.json())
//       .then(data => {
//         setTrains(data.trains || []);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [stationCode]);

//   if (loading) {
//     return <div className="p-6 text-gray-500">Loading trains…</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">
//         🚆 Trains arriving at {stationCode}
//       </h1>

//       {trains.length === 0 && (
//         <p className="text-gray-500">No trains in next 30 minutes</p>
//       )}

//       <div className="space-y-3">
//         {trains.map(train => (
//           <div
//             key={train.train_no}
//             className="p-4 bg-white rounded-xl shadow flex justify-between"
//           >
//             <div>
//               <h2 className="font-semibold">
//                 {train.train_name} ({train.train_no})
//               </h2>
//               <p className="text-sm text-gray-500">
//                 Arrival: {train.arrival_time} • Platform {train.platform}
//               </p>
//             </div>

//             <div className="text-right">
//               {train.delay_minutes > 0 ? (
//                 <span className="text-red-600 font-semibold">
//                   +{train.delay_minutes} min
//                 </span>
//               ) : (
//                 <span className="text-green-600 font-semibold">
//                   On Time
//                 </span>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { densityColor } from "../utils/densityColor";

export default function StationTrainsPage() {
  const { stationCode } = useParams();
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://mahakavach-backend.onrender.com/api/v1/stations/${stationCode}/trains`)
      .then((res) => res.json())
      .then((data) => {
        setTrains(data.trains || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [stationCode]);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading trains…</div>;
  }

  return (
    <div className="p-6 pt-16">
      <h1 className="text-2xl font-bold mb-4">
        🚆 Trains arriving at {stationCode}
      </h1>

      {trains.length === 0 && (
        <p className="text-gray-500">No trains in the next 30 minutes</p>
      )}

      <div className="space-y-3">
        {trains.map((train) => {
          const densityLevel = train.crowd?.level || "UNKNOWN";
          const colorClass =
            densityColor[densityLevel] || densityColor.UNKNOWN;

          return (
            <div
              key={`${train.train_no}-${train.arrival_time}`}
              className={`p-4 rounded-xl shadow flex justify-between items-center ${colorClass}`}
            >
              {/* LEFT */}
              <div>
                <h2 className="font-semibold">
                  {train.train_name || "Local Train"} ({train.train_no})
                </h2>
                <p className="text-sm">
                  Arrival: {train.arrival_time} • {train.time_to_arrival}
                </p>
              </div>

              {/* RIGHT */}
              <div className="text-right text-sm">
                Crowd:{" "}
                <span className="font-semibold">
                  {train.crowd
                    ? `${train.crowd.level} (${train.crowd.trend})`
                    : "Not available"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

