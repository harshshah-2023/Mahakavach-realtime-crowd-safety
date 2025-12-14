from fastapi import FastAPI, WebSocket
from app.websocket import manager, dummy_crowd_generator
import asyncio
from app.models import UserCrowdSignal
from app.state import user_signals
from datetime import datetime


app = FastAPI(title="MahaKavach Backend")


@app.get("/")
def health_check():
    return {"status": "MahaKavach backend running"}


@app.on_event("startup")
async def startup_event():
    asyncio.create_task(dummy_crowd_generator())


@app.websocket("/ws/crowd")
async def crowd_websocket(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await asyncio.sleep(5)
            await manager.broadcast_current_state()
    except Exception:
        manager.disconnect(websocket)

@app.post("/signal/crowd")
def receive_crowd_signal(signal: UserCrowdSignal):
    key = f"{signal.station_id}:{signal.coach_id}"

    user_signals[key].append(signal.signal)

    return {
        "status": "accepted",
        "signals_in_window": len(user_signals[key])
    }
