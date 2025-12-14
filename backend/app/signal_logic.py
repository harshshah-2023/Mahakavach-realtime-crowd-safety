def infer_trend(signals: list[str]) -> str:
    if not signals:
        return "→"

    score = 0
    for s in signals:
        if s == "CROWD_INCREASING":
            score += 1
        elif s == "CROWD_DECREASING":
            score -= 1

    if score > 0:
        return "↑"
    elif score < 0:
        return "↓"
    return "→"
