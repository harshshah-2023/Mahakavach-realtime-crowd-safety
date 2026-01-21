from datetime import datetime, time, timedelta
from typing import Dict, List, Optional
from sqlalchemy.orm import Session

from app.db_models import TrainSchedule, Train


class TrainService:
    """PostgreSQL-backed train schedule service"""

    def __init__(self, db: Session):
        self.db = db

    # ---------------------------------------------------------------------
    # Helpers
    # ---------------------------------------------------------------------

    def parse_time_raw(self, time_raw: str) -> Optional[time]:
        """
        Extract arrival time from raw string like:
        '08:14 08:20' → 08:14
        """
        if not time_raw:
            return None

        first = time_raw.split()[0]
        try:
            return datetime.strptime(first, "%H:%M").time()
        except ValueError:
            return None

    def time_in_window(self, t: time, start: time, end: time) -> bool:
        if start <= end:
            return start <= t <= end
        return t >= start or t <= end  # midnight crossover

    def calculate_time_difference(self, now: time, arrival: time) -> str:
        now_dt = datetime.combine(datetime.today(), now)
        arr_dt = datetime.combine(datetime.today(), arrival)

        if arrival < now:
            arr_dt += timedelta(days=1)

        minutes = int((arr_dt - now_dt).total_seconds() / 60)

        if minutes == 0:
            return "Now"
        if minutes < 0:
            return f"{abs(minutes)} min ago"
        if minutes < 60:
            return f"In {minutes} min"

        return f"In {minutes // 60}h {minutes % 60}m"

    # ---------------------------------------------------------------------
    # Core APIs
    # ---------------------------------------------------------------------

    def get_trains_at_station(
        self,
        station: str,
        time: time,
        window_minutes: int = 30
    ) -> Dict:
        center = datetime.combine(datetime.today(), time)
        start = (center - timedelta(minutes=window_minutes // 2)).time()
        end = (center + timedelta(minutes=window_minutes // 2)).time()

        rows = (
            self.db.query(TrainSchedule)
            .filter(TrainSchedule.station == station)
            .all()
        )

        results = []

        for row in rows:
            arrival = self.parse_time_raw(row.time_raw)
            if not arrival:
                continue

            if self.time_in_window(arrival, start, end):
                train = (
                    self.db.query(Train)
                    .filter(Train.train_no == row.train_no)
                    .first()
                )

                results.append({
                    "train_no": row.train_no,
                    "train_name": train.train_name if train else None,
                    "arrival_time": arrival.strftime("%H:%M"),
                    "time_to_arrival": self.calculate_time_difference(time, arrival)
                })

        results.sort(key=lambda x: x["arrival_time"])

        return {
            "station": station,
            "query_time": time.strftime("%H:%M"),
            "window_minutes": window_minutes,
            "total_trains": len(results),
            "trains": results
        }

    # ---------------------------------------------------------------------
    # Analytics
    # ---------------------------------------------------------------------

    def analyze_peak_hours(self, station: Optional[str] = None) -> Dict:
        query = self.db.query(TrainSchedule)
        if station:
            query = query.filter(TrainSchedule.station == station)

        hourly = {}

        for row in query.all():
            arrival = self.parse_time_raw(row.time_raw)
            if not arrival:
                continue

            hourly[arrival.hour] = hourly.get(arrival.hour, 0) + 1

        peaks = sorted(hourly.items(), key=lambda x: x[1], reverse=True)[:5]

        return {
            "peak_hours": [
                {
                    "hour": f"{h:02d}:00-{h:02d}:59",
                    "train_count": c
                }
                for h, c in peaks
            ],
            "total_trains_analyzed": sum(hourly.values())
        }
