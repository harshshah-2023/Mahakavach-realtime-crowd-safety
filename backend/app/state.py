from typing import Dict, List
from collections import defaultdict, deque

# Live crowd state (already exists)
crowd_state: Dict[str, Dict] = {}

# User signals (already exists)
USER_SIGNAL_WINDOW = 10
user_signals = defaultdict(lambda: deque(maxlen=USER_SIGNAL_WINDOW))

stations_master = {}
station_aliases = {}
train_master = {}
train_schedule = []

