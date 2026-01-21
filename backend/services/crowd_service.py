import random
from datetime import datetime
from typing import Dict, List, Optional

from app.models import (
    CrowdDensityLevel,
    CrowdSignalType,
    TrendDirection,
    DataSource,
    UserCrowdSignal
)
from app.state import crowd_state


class CrowdService:
    """Service for crowd prediction and management (mock + user signals)"""

    def __init__(self):
        self.coaches = [f"C{i}" for i in range(1, 13)]
        self.density_levels = list(CrowdDensityLevel)

    def update_crowd_state_periodic(self):
        """Periodically evolve crowd state (called by WS loop)."""
        for station_id, station_data in crowd_state.items():
            coaches = station_data.get("coaches", {})

            for coach_id, coach_data in coaches.items():
                trend = coach_data.get("trend", TrendDirection.STABLE)
                current_density = coach_data.get("density", CrowdDensityLevel.MEDIUM)

                densities = list(CrowdDensityLevel)
                idx = densities.index(current_density)

                if trend == TrendDirection.INCREASING:
                    idx = min(len(densities) - 1, idx + 1)
                elif trend == TrendDirection.DECREASING:
                    idx = max(0, idx - 1)

                coach_data["density"] = densities[idx]
                coach_data["last_updated"] = datetime.utcnow().isoformat()
            
            station_data["timestamp"] = datetime.utcnow().isoformat()




    # ------------------------------------------------------------------
    # Mock generation
    # ------------------------------------------------------------------

    def generate_mock_crowd_for_station(self, station_id: str) -> Dict:
        hour = datetime.now().hour
        base_density = self._base_density_by_time(hour)

        coaches = {}
        for coach in self.coaches:
            density = self._vary_density(base_density)
            coaches[coach] = {
                "density": density,
                "trend": self._random_trend(),
                "confidence": round(random.uniform(0.7, 0.95), 2),
                "last_updated": datetime.utcnow().isoformat(),
                "user_reports_count": 0,
                "source": DataSource.MOCK
            }

        return {
            "station_id": station_id,
            "timestamp": datetime.utcnow().isoformat(),
            "overall_density": base_density,
            "coaches": coaches,
            "source": DataSource.MOCK
        }

    def _base_density_by_time(self, hour: int) -> CrowdDensityLevel:
        if 7 <= hour < 10 or 17 <= hour < 21:
            return random.choice([CrowdDensityLevel.HIGH, CrowdDensityLevel.VERY_HIGH])
        if 10 <= hour < 17:
            return random.choice([CrowdDensityLevel.MEDIUM, CrowdDensityLevel.HIGH])
        if hour >= 22 or hour < 6:
            return random.choice([CrowdDensityLevel.VERY_LOW, CrowdDensityLevel.LOW])
        return CrowdDensityLevel.MEDIUM

    def _vary_density(self, base: CrowdDensityLevel) -> CrowdDensityLevel:
        densities = list(CrowdDensityLevel)
        idx = densities.index(base)

        r = random.random()
        if r < 0.7:
            return base
        if r < 0.9:
            return densities[max(0, min(len(densities) - 1, idx + random.choice([-1, 1])))]
        return densities[max(0, min(len(densities) - 1, idx + random.choice([-2, 2])))]

    def _random_trend(self) -> TrendDirection:
        return random.choice([
            TrendDirection.STABLE,
            TrendDirection.STABLE,
            TrendDirection.STABLE,
            TrendDirection.INCREASING,
            TrendDirection.DECREASING
        ])

    # ------------------------------------------------------------------
    # Read APIs
    # ------------------------------------------------------------------

    def get_line_overview(self, stations: List[str]) -> List[Dict]:
        overview = []

        for station in stations:
            if station not in crowd_state:
                crowd_state[station] = self.generate_mock_crowd_for_station(station)

            data = crowd_state[station]
            avg = self._average_density(data["coaches"])

            overview.append({
                "station_code": station,
                "overall_density": avg,
                "timestamp": data["timestamp"],
                "total_coaches": len(data["coaches"])
            })

        return overview

    def get_station_crowd(self, station_id: str) -> Dict:
        if station_id not in crowd_state:
            crowd_state[station_id] = self.generate_mock_crowd_for_station(station_id)
        return crowd_state[station_id]

    def get_train_crowd(self, train_no: str, station_code: Optional[str] = None) -> Dict:
        coaches = {}
        for coach in self.coaches:
            coaches[coach] = {
                "density": random.choice(self.density_levels),
                "trend": self._random_trend(),
                "confidence": round(random.uniform(0.6, 0.9), 2),
                "last_updated": datetime.utcnow().isoformat(),
                "user_reports_count": random.randint(0, 10),
                "source": DataSource.MOCK
            }

        return {
            "train_no": train_no,
            "station_code": station_code,
            "timestamp": datetime.utcnow().isoformat(),
            "overall_density": self._average_density(coaches),
            "coaches": coaches,
            "source": DataSource.MOCK
        }

    # ------------------------------------------------------------------
    # User signals
    # ------------------------------------------------------------------

    def process_user_signal(self, signal: UserCrowdSignal):
        station = signal.station_id
        coach = signal.coach_id

        if station not in crowd_state:
            crowd_state[station] = self.generate_mock_crowd_for_station(station)

        coaches = crowd_state[station]["coaches"]
        if coach not in coaches:
            return

        data = coaches[coach]

        if signal.signal == CrowdSignalType.VERY_CROWDED:
            data["density"] = CrowdDensityLevel.VERY_HIGH
        elif signal.signal == CrowdSignalType.RELATIVELY_EMPTY:
            data["density"] = CrowdDensityLevel.LOW
        elif signal.signal == CrowdSignalType.CROWD_INCREASING:
            data["trend"] = TrendDirection.INCREASING
        elif signal.signal == CrowdSignalType.CROWD_DECREASING:
            data["trend"] = TrendDirection.DECREASING

        data["user_reports_count"] += 1
        data["confidence"] = min(0.95, data["confidence"] + 0.05)
        data["last_updated"] = datetime.utcnow().isoformat()
        data["source"] = DataSource.USER_REPORT

    # ------------------------------------------------------------------
    # Image analysis (mock)
    # ------------------------------------------------------------------

    def analyze_crowd_image(
        self,
        station_id: str,
        train_no: Optional[str],
        coach_id: str
    ) -> Dict:
        density = random.choice(self.density_levels)
        confidence = round(random.uniform(0.75, 0.95), 2)

        if station_id not in crowd_state:
            crowd_state[station_id] = self.generate_mock_crowd_for_station(station_id)

        if coach_id in crowd_state[station_id]["coaches"]:
            crowd_state[station_id]["coaches"][coach_id].update({
                "density": density,
                "confidence": confidence,
                "last_updated": datetime.utcnow().isoformat(),
                "source": DataSource.IMAGE_ANALYSIS
            })

        return {
            "density": density,
            "confidence": confidence,
            "people_count_estimate": random.randint(20, 200),
            "processing_time_ms": random.randint(200, 800),
            "privacy_preserved": True
        }

    # ------------------------------------------------------------------
    # Helpers
    # ------------------------------------------------------------------

    def _average_density(self, coaches: Dict) -> CrowdDensityLevel:
        if not coaches:
            return CrowdDensityLevel.MEDIUM

        weights = {
            CrowdDensityLevel.VERY_LOW: 1,
            CrowdDensityLevel.LOW: 2,
            CrowdDensityLevel.MEDIUM: 3,
            CrowdDensityLevel.HIGH: 4,
            CrowdDensityLevel.VERY_HIGH: 5
        }

        total = sum(weights[c["density"]] for c in coaches.values())
        avg = round(total / len(coaches))

        for level, value in weights.items():
            if value == avg:
                return level

        return CrowdDensityLevel.MEDIUM