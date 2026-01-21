from fastapi import FastAPI, WebSocket, HTTPException, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import asyncio
from datetime import datetime
from typing import Optional

from app.websocket import manager, crowd_broadcast_loop
from app.models import UserCrowdSignal, CrowdImageUpload
from app.state import user_signals, crowd_state
from app import state

from app.db_session import get_db
from app.db_models import Station, Train
from services.crowd_service import CrowdService
from services.train_service import TrainService
from app.db_session import SessionLocal
from app.db_models import Station


# Background task storage
background_tasks = set()

# =============================================================================
# LIFESPAN
# =============================================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚂 Starting MahaKavach Backend (PostgreSQL mode)...")

    # Initialize services
    state.crowd_service = CrowdService()
    # state.train_service = TrainService(db)

    # Load stations from DB
    db = SessionLocal()
    stations = db.query(Station).all()
    db.close()

    for s in stations:
        state.crowd_state[s.station] = (
            state.crowd_service.generate_mock_crowd_for_station(s.station)
        )

    print(f"✅ Crowd state initialized for {len(state.crowd_state)} stations")

    # Start background WebSocket broadcaster
    task = asyncio.create_task(crowd_broadcast_loop())
    background_tasks.add(task)
    task.add_done_callback(background_tasks.discard)

    print("🎯 MahaKavach Backend Ready!")
    yield

    print("🛑 Shutting down MahaKavach Backend...")
    for task in background_tasks:
        task.cancel()
    await asyncio.gather(*background_tasks, return_exceptions=True)

# =============================================================================
# APP INIT
# =============================================================================

app = FastAPI(
    title="MahaKavach Backend",
    description="Real-time crowd prediction for Mumbai Suburban Railways",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =============================================================================
# HEALTH
# =============================================================================

@app.get("/")
def health_check():
    return {
        "status": "running",
        "service": "MahaKavach Backend",
        "timestamp": datetime.utcnow().isoformat()
    }

# =============================================================================
# STATIONS
# =============================================================================

@app.get("/api/v1/stations")
def get_all_stations(db=Depends(get_db)):
    stations = db.query(Station).all()
    return {
        "line": "harbour",
        "total": len(stations),
        "stations": [{"name": s.station} for s in stations]
    }

@app.get("/api/v1/stations/{station_name}")
def get_station_details(station_name: str, db=Depends(get_db)):
    station = db.query(Station).filter(Station.station == station_name).first()
    if not station:
        raise HTTPException(status_code=404, detail="Station not found")

    return {
        "name": station.station,
        "line": "harbour"
    }

# =============================================================================
# TRAINS
# =============================================================================

@app.get("/api/v1/trains")
def get_all_trains(
    limit: int = Query(100, ge=1, le=1000),
    db=Depends(get_db)
):
    trains = db.query(Train).limit(limit).all()
    return {
        "total": len(trains),
        "trains": [
            {"train_no": t.train_no, "train_name": t.train_name}
            for t in trains
        ]
    }

# =============================================================================
# STATION → TRAIN SCHEDULE
# =============================================================================

@app.get("/api/v1/stations/{station_name}/trains")
def get_trains_at_station(
    station_name: str,
    time: Optional[str] = Query(None, description="HH:MM"),
    window_minutes: int = Query(30, ge=5, le=180),
    db=Depends(get_db)
):
    query_time = (
        datetime.strptime(time, "%H:%M").time()
        if time else datetime.now().time()
    )

    service = TrainService(db)
    return service.get_trains_at_station(
        station=station_name,
        time=query_time,
        window_minutes=window_minutes
    )

# =============================================================================
# LIVE STATION VIEW
# =============================================================================

@app.get("/api/v1/stations/{station_name}/live")
def get_live_station_data(station_name: str, db=Depends(get_db)):
    service = TrainService(db)
    trains = service.get_trains_at_station(
        station=station_name,
        time=datetime.now().time(),
        window_minutes=30
    )

    return {
        "station": station_name,
        "timestamp": datetime.utcnow().isoformat(),
        "upcoming_trains": trains["trains"],
        "crowd_data": crowd_state.get(station_name, {})
    }

# =============================================================================
# CROWD SIGNALS
# =============================================================================

@app.post("/api/v1/signal/crowd")
def submit_crowd_signal(signal: UserCrowdSignal):
    key = f"{signal.station_id}:{signal.coach_id}"
    user_signals[key].append(signal.signal)

    state.crowd_service.process_user_signal(signal)

    return {
        "status": "accepted",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.post("/api/v1/signal/image")
async def submit_crowd_image(image_data: CrowdImageUpload):
    analysis = state.crowd_service.analyze_crowd_image(
        station_id=image_data.station_id,
        train_no=image_data.train_no,
        coach_id=image_data.coach_id
    )
    return {
        "status": "processed",
        "analysis": analysis,
        "timestamp": datetime.utcnow().isoformat()
    }

# =============================================================================
# WEBSOCKET
# =============================================================================

@app.websocket("/ws/crowd")
async def crowd_websocket(websocket: WebSocket):
    await manager.connect(websocket)

    try:
        # Keep connection alive forever
        while True:
            await asyncio.sleep(3600)
    except Exception:
        pass
    finally:
        manager.disconnect(websocket)

