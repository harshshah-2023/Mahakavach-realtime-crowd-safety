from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum
from typing import Optional, List


class CrowdDensityLevel(str, Enum):
    """Crowd density levels"""
    VERY_LOW = "VERY_LOW"
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    VERY_HIGH = "VERY_HIGH"


class CrowdSignalType(str, Enum):
    """User-reported crowd signal types"""
    VERY_CROWDED = "VERY_CROWDED"
    RELATIVELY_EMPTY = "RELATIVELY_EMPTY"
    CROWD_INCREASING = "CROWD_INCREASING"
    CROWD_DECREASING = "CROWD_DECREASING"


class DataSource(str, Enum):
    """Source of crowd data"""
    PREDICTION = "prediction"
    USER_REPORT = "user_report"
    IMAGE_ANALYSIS = "image_analysis"
    HISTORICAL = "historical"
    MOCK = "mock"


class TrendDirection(str, Enum):
    """Crowd trend direction"""
    INCREASING = "↑"
    DECREASING = "↓"
    STABLE = "→"
    UNKNOWN = "?"


class CrowdSignal(BaseModel):
    """Complete crowd signal data point"""
    station_id: str
    train_id: str
    coach_id: str
    density_level: CrowdDensityLevel
    confidence: float = Field(ge=0.0, le=1.0)
    source: DataSource
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class UserCrowdSignal(BaseModel):
    """User-submitted crowd signal"""
    station_id: str
    coach_id: str
    signal: CrowdSignalType
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    train_no: Optional[str] = None
    user_id: Optional[str] = None  # Anonymous ID for rate limiting


class CrowdImageUpload(BaseModel):
    """Image upload request for crowd analysis"""
    station_id: str
    train_no: Optional[str] = None
    coach_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    # Note: Actual image data would be sent as multipart/form-data
    # This model is for metadata


class CoachCrowdData(BaseModel):
    """Crowd data for a single coach"""
    coach_id: str
    density: CrowdDensityLevel
    trend: TrendDirection
    confidence: float = Field(ge=0.0, le=1.0)
    last_updated: datetime
    user_reports_count: int = 0


class StationCrowdData(BaseModel):
    """Crowd data for a station"""
    station_id: str
    station_name: str
    timestamp: datetime
    overall_density: CrowdDensityLevel
    coaches: List[CoachCrowdData] = []
    platform_crowd: Optional[CrowdDensityLevel] = None


class TrainCrowdData(BaseModel):
    """Crowd data for a train"""
    train_no: str
    train_name: str
    timestamp: datetime
    overall_density: CrowdDensityLevel
    coaches: List[CoachCrowdData]
    current_station: Optional[str] = None


class TrainScheduleEntry(BaseModel):
    train_no: str
    station: str
    time_raw: str

    arrival_time: Optional[str] = None
    departure_time: Optional[str] = None


class StationInfo(BaseModel):
    name: str


class TrainInfo(BaseModel):
    train_no: str
    train_name: str
    total_coaches: int = 12

class PredictionRequest(BaseModel):
    """Request for crowd prediction"""
    station_id: str
    train_no: Optional[str] = None
    time: Optional[str] = None  # HH:MM format
    date: Optional[str] = None  # YYYY-MM-DD format


class PredictionResponse(BaseModel):
    """Crowd prediction response"""
    station_id: str
    train_no: Optional[str] = None
    predicted_density: CrowdDensityLevel
    confidence: float
    factors: List[str]  # Factors affecting prediction
    timestamp: datetime
    valid_until: datetime