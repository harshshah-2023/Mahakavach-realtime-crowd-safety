from fastapi import FastAPI, WebSocket
from app.websocket import manager, dummy_crowd_generator
import asyncio
from app.models import UserCrowdSignal
from app.state import user_signals
from datetime import datetime
from app.state import (
    stations_master,
    station_aliases,
    train_master,
    train_schedule
)
from services.timetable_loader import (
    load_station_master,
    load_station_aliases,
    load_train_master,
    load_train_schedule
)



app = FastAPI(title="MahaKavach Backend")


@app.get("/")
def health_check():
    return {"status": "MahaKavach backend running"}

@app.on_event("startup")
async def startup_event():
    from services.timetable_loader import (
        load_station_master,
        load_station_aliases,
        load_train_master,
        load_train_schedule,
    )
    from app import state

    state.stations_master = load_station_master()
    state.station_aliases = load_station_aliases()
    state.train_master = load_train_master()
    state.train_schedule = load_train_schedule()

    print("Stations loaded:", len(state.stations_master))
    print("Aliases loaded:", len(state.station_aliases))
    print("Trains loaded:", len(state.train_master))
    print("Schedule rows:", len(state.train_schedule))


@app.websocket("/ws/crowd")
async def crowd_websocket(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await asyncio.sleep(5)
            await manager.broadcast_current_state()
    except Exception:
        manager.disconnect(websocket)

@app.get("/station/{station_code}/trains")
def get_trains_for_station(station_code: str):
    arrivals = [
        row for row in train_schedule
        if row["station"] == station_code
    ]

    return {
        "station": station_code,
        "total_trains": len(arrivals),
        "trains": arrivals[:10]  # limit for now
    }


@app.post("/signal/crowd")
def receive_crowd_signal(signal: UserCrowdSignal):
    key = f"{signal.station_id}:{signal.coach_id}"

    user_signals[key].append(signal.signal)

    return {
        "status": "accepted",
        "signals_in_window": len(user_signals[key])
    }
