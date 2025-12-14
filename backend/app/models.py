from pydantic import BaseModel
from datetime import datetime
from enum import Enum


class CrowdSignal(BaseModel):
    station_id: str
    train_id: str
    coach_id: str
    density_level: str  # LOW | MEDIUM | HIGH
    confidence: float
    source: str         # prediction | user | photo
    timestamp: datetime


class CrowdSignalType(str, Enum):
    VERY_CROWDED = "VERY_CROWDED"
    RELATIVELY_EMPTY = "RELATIVELY_EMPTY"
    CROWD_INCREASING = "CROWD_INCREASING"
    CROWD_DECREASING = "CROWD_DECREASING"

    
class UserCrowdSignal(BaseModel):
    station_id: str
    coach_id: str
    signal: CrowdSignalType
    timestamp: datetime