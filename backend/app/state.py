from typing import Dict, List
from collections import defaultdict, deque

# =============================================================================
# LIVE CROWD STATE (REAL-TIME, IN-MEMORY)
# =============================================================================

# Format:
# {
#   station_id: {
#       station_id,
#       timestamp,
#       overall_density,
#       coaches: {
#           C1: { density, trend, confidence, source, ... },
#           ...
#       }
#   }
# }
crowd_state: Dict[str, Dict] = {}

# =============================================================================
# USER SIGNAL BUFFER (ROLLING WINDOW)
# =============================================================================

USER_SIGNAL_WINDOW = 10

# Format:
# {
#   "CSMT:C1": deque(["VERY_CROWDED", "CROWD_INCREASING"], maxlen=10)
# }
user_signals = defaultdict(lambda: deque(maxlen=USER_SIGNAL_WINDOW))

# =============================================================================
# SERVICES (INITIALIZED AT APP STARTUP)
# =============================================================================

# These are service singletons, NOT data containers
crowd_service = None     # CrowdService()
train_service = None     # TrainService(db_session_factory)

# =============================================================================
# PREDICTION CACHE (SHORT-LIVED)
# =============================================================================

# Used to avoid recalculating predictions frequently
# Format:
# {
#   "CSMT:08:30": {
#       "prediction": {...},
#       "timestamp": "2026-01-20T08:25:00Z"
#   }
# }
prediction_cache: Dict[str, Dict] = {}
PREDICTION_CACHE_TTL = 300  # seconds (5 minutes)

# =============================================================================
# ANALYTICS (FUTURE / HYBRID)
# =============================================================================

# In future, this moves to PostgreSQL / TimescaleDB
historical_crowd_data: Dict[str, Dict] = {}

# Cached peak hour analysis to reduce DB load
peak_hours_cache: Dict[str, List] = {}
