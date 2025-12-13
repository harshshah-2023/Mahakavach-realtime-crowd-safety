from pydantic import BaseModel
from datetime import datetime


class CrowdSignal(BaseModel):
    station_id: str
    train_id: str
    coach_id: str
    density_level: str  # LOW | MEDIUM | HIGH
    confidence: float
    source: str         # prediction | user | photo
    timestamp: datetime
