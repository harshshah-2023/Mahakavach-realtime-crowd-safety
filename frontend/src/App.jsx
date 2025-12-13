import { useEffect, useState } from "react";

function App() {
  const [crowdData, setCrowdData] = useState({});

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

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>MahaKavach – Live Crowd Monitor</h1>

      {Object.keys(crowdData).map((station) => (
        <div key={station} style={{ marginBottom: "20px" }}>
          <h2>Station: {station}</h2>

          {Object.entries(crowdData[station].coaches).map(
            ([coach, density]) => (
              <div
                key={coach}
                style={{
                  padding: "8px",
                  margin: "4px 0",
                  background:
                    density === "LOW"
                      ? "#4caf50"
                      : density === "MEDIUM"
                      ? "#ff9800"
                      : "#f44336",
                  color: "white",
                  width: "200px",
                }}
              >
                {coach} — {density}
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
