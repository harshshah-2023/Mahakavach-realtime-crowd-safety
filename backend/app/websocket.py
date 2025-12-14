from fastapi import WebSocket
from app.state import crowd_state
import asyncio
import json
import random
from datetime import datetime
from app.state import user_signals
from app.signal_logic import infer_trend

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_text(json.dumps(message))

    async def broadcast_current_state(self):
        enriched_state = {}

        for station, data in crowd_state.items():
            enriched_state[station] = {
                "station_id": station,
                "timestamp": data["timestamp"],
                "coaches": {}
            }

            for coach, density in data["coaches"].items():
                key = f"{station}:{coach}"
                signals = list(user_signals[key])

                enriched_state[station]["coaches"][coach] = {
                    "density": density,
                    "trend": infer_trend(signals)
                }

        await self.broadcast({
            "type": "crowd_update",
            "data": enriched_state
        })




manager = ConnectionManager()


async def dummy_crowd_generator():
    stations = ["ANDH", "BAND", "BORI"]
    coaches = ["C1", "C2", "C3"]
    densities = ["LOW", "MEDIUM", "HIGH"]

    while True:
        for station in stations:
            crowd_state[station] = {
                "station_id": station,
                "timestamp": datetime.utcnow().isoformat(),
                "coaches": {
                    coach: random.choice(densities)
                    for coach in coaches
                }
            }
        await asyncio.sleep(5)
