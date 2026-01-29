export function getRushStatus() {
  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60;

  const isMorningRush = hour >= 8 && hour <= 11;
  const isEveningRush = hour >= 17.5 && hour <= 21;

  if (isMorningRush || isEveningRush) {
    return { level: "PEAK", color: "bg-red-600" };
  }

  if (
    (hour >= 7 && hour < 8) ||
    (hour > 11 && hour <= 12) ||
    (hour >= 16.5 && hour < 17.5) ||
    (hour > 21 && hour <= 22)
  ) {
    return { level: "HIGH", color: "bg-orange-500" };
  }

  if (hour >= 6 && hour < 23) {
    return { level: "MODERATE", color: "bg-yellow-400" };
  }

  return { level: "LOW", color: "bg-green-600" };
}
