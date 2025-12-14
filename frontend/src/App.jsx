import { useEffect, useState } from "react";

function densityColor(density) {
  if (density === "LOW") return "#4caf50";
  if (density === "MEDIUM") return "#ff9800";
  return "#f44336";
}

function App() {
  const [crowdData, setCrowdData] = useState({});
  const API_BASE = "http://127.0.0.1:8000";

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/crowd");

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "crowd_update") {
        setCrowdData(message.data);
      }
    };

    return () => ws.close();
  }, []);
    const sendSignal = (stationId, coachId, signal) => {
    fetch(`${API_BASE}/signal/crowd`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        station_id: stationId,
        coach_id: coachId,
        signal,
        timestamp: new Date().toISOString()
      })
    });
  };

  return (
   <div style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
      <h1>🚆 MahaKavach – Live Crowd Intelligence</h1>

      {Object.entries(crowdData).map(([stationId, station]) => (
        <div
          key={stationId}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 16,
            marginTop: 20
          }}
        >
          <h2>Station: {stationId}</h2>

          {Object.entries(station.coaches).map(([coachId, coach]) => (
            <div
              key={coachId}
              style={{
                background: densityColor(coach.density),
                color: "white",
                padding: 12,
                borderRadius: 6,
                marginBottom: 10
              }}
            >
              <strong>{coachId}</strong> — {coach.density}{" "}
              <span style={{ fontSize: 20, marginLeft: 8 }}>
                {coach.trend}
              </span>

              <div style={{ marginTop: 8 }}>
                <button
                  onClick={() =>
                    sendSignal(stationId, coachId, "CROWD_INCREASING")
                  }
                >
                  ⬆️ Increasing
                </button>

                <button
                  onClick={() =>
                    sendSignal(stationId, coachId, "CROWD_DECREASING")
                  }
                  style={{ marginLeft: 6 }}
                >
                  ⬇️ Decreasing
                </button>

                <button
                  onClick={() =>
                    sendSignal(stationId, coachId, "VERY_CROWDED")
                  }
                  style={{ marginLeft: 6 }}
                >
                  🟥 Very Crowded
                </button>

                <button
                  onClick={() =>
                    sendSignal(stationId, coachId, "RELATIVELY_EMPTY")
                  }
                  style={{ marginLeft: 6 }}
                >
                  🟩 Empty
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
