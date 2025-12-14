from typing import Dict
from collections import defaultdict, deque


# In-memory live crowd state
crowd_state: Dict[str, Dict] = {}

USER_SIGNAL_WINDOW = 10

user_signals = defaultdict(
    lambda: deque(maxlen=USER_SIGNAL_WINDOW)
)
