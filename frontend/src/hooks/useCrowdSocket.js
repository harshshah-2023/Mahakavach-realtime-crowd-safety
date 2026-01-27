import { useEffect, useState, useRef } from "react";

let socket = null; // 🔑 singleton

export function useCrowdSocket() {
  const [crowdData, setCrowdData] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    if (!socket || socket.readyState === WebSocket.CLOSED) {
      socket = new WebSocket("wss://mahakavach-backend.onrender.com/ws/crowd");
    }

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log("📡 WS message in hook:", msg);

      if (msg.type === "initial_state" || msg.type === "crowd_update") {
        setCrowdData(msg.data || {});
        setLastUpdated(msg.timestamp);
      }
    };

    socket.onerror = (err) => {
      console.error("❌ WebSocket error", err);
    };

    socket.onclose = () => {
      console.log("🔌 WebSocket closed");
    };

    return () => {
      // ❌ DO NOT close socket here in dev
    };
  }, []);

  return { crowdData, lastUpdated };
}
