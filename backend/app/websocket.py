import asyncio
import json
from datetime import datetime
from typing import List

from fastapi import WebSocket

from app.state import crowd_state, user_signals
from app.signal_logic import infer_trend
from app.models import CrowdDensityLevel, TrendDirection


class ConnectionManager:
    """Manages WebSocket connections for real-time updates"""

    def __init__(self):
        self.active_connections: List[WebSocket] = []

    # ------------------------------------------------------------------
    # Connection lifecycle
    # ------------------------------------------------------------------

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        print(f"✓ WebSocket connected ({len(self.active_connections)})")
        await self.send_initial_state(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            print(f"✗ WebSocket disconnected ({len(self.active_connections)})")

    # ------------------------------------------------------------------
    # Messaging
    # ------------------------------------------------------------------

    async def send_initial_state(self, websocket: WebSocket):
        try:
            payload = self._build_enriched_state()
            await websocket.send_text(json.dumps({
                "type": "initial_state",
                "data": payload,
                "timestamp": datetime.utcnow().isoformat()
            }))
        except Exception as e:
            print(f"Initial state send error: {e}")

    async def broadcast(self, message: dict):
        disconnected = []

        for ws in self.active_connections:
            try:
                await ws.send_text(json.dumps(message))
            except Exception as e:
                print(f"Broadcast error: {e}")
                disconnected.append(ws)

        for ws in disconnected:
            self.disconnect(ws)

    async def broadcast_current_state(self):
        await self.broadcast({
            "type": "crowd_update",
            "data": self._build_enriched_state(),
            "timestamp": datetime.utcnow().isoformat()
        })

    # ------------------------------------------------------------------
    # State enrichment
    # ------------------------------------------------------------------

    def _build_enriched_state(self) -> dict:
        enriched = {}

        for station_id, station_data in crowd_state.items():
            enriched[station_id] = {
                "station_id": station_id,
                "timestamp": station_data.get("timestamp"),
                "overall_density": self._enum_to_str(
                    station_data.get("overall_density", CrowdDensityLevel.MEDIUM)
                ),
                "coaches": {}
            }

            for coach_id, coach_data in station_data.get("coaches", {}).items():
                key = f"{station_id}:{coach_id}"
                signals = list(user_signals.get(key, []))

                # Prefer service-maintained trend, fallback to inference
                trend = coach_data.get("trend")
                if not trend:
                    trend = infer_trend(signals)

                enriched[station_id]["coaches"][coach_id] = {
                    "density": self._enum_to_str(
                        coach_data.get("density", CrowdDensityLevel.MEDIUM)
                    ),
                    "trend": self._enum_to_str(trend, TrendDirection),
                    "confidence": coach_data.get("confidence", 0.5),
                    "user_reports_count": coach_data.get("user_reports_count", 0),
                    "last_updated": coach_data.get("last_updated"),
                    "source": str(coach_data.get("source", "mock"))
                }

        return enriched

    # ------------------------------------------------------------------
    # Alerts & train updates
    # ------------------------------------------------------------------

    async def send_alert(self, station_id: str, message: str, severity: str = "info"):
        await self.broadcast({
            "type": "alert",
            "station_id": station_id,
            "message": message,
            "severity": severity,
            "timestamp": datetime.utcnow().isoformat()
        })

    async def send_train_update(self, train_no: str, station_id: str, status: str):
        await self.broadcast({
            "type": "train_update",
            "train_no": train_no,
            "station_id": station_id,
            "status": status,
            "timestamp": datetime.utcnow().isoformat()
        })

    # ------------------------------------------------------------------
    # Helpers
    # ------------------------------------------------------------------

    def _enum_to_str(self, value, enum_cls=None):
        if hasattr(value, "value"):
            return value.value
        return str(value)


# ----------------------------------------------------------------------
# Global manager instance
# ----------------------------------------------------------------------

manager = ConnectionManager()


# ----------------------------------------------------------------------
# Background broadcaster
# ----------------------------------------------------------------------

async def crowd_broadcast_loop():
    from app import state

    print("📡 Crowd broadcast loop started")

    while True:
        try:
            await asyncio.sleep(5)

            if hasattr(state, "crowd_service"):
                state.crowd_service.update_crowd_state_periodic()

            if manager.active_connections:
                await manager.broadcast_current_state()

        except asyncio.CancelledError:
            print("🛑 Crowd broadcast loop stopped")
            break
        except Exception as e:
            print(f"Broadcast loop error: {e}")
            await asyncio.sleep(5)


# ----------------------------------------------------------------------
# Optional mock alerts (dev only)
# ----------------------------------------------------------------------

async def generate_mock_alerts():
    import random

    stations = ["CSMT", "ANDH", "BAND", "BORI", "CHG"]
    messages = [
        "High crowd expected in next 15 minutes",
        "Platform crowd increasing",
        "Train delayed by 5 minutes",
        "Crowd levels returning to normal"
    ]

    while True:
        await asyncio.sleep(60)
        if random.random() > 0.7:
            await manager.send_alert(
                random.choice(stations),
                random.choice(messages),
                random.choice(["info", "warning", "alert"])
            )
