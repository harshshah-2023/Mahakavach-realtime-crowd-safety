export function formatTime(ts) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// For UI-only expiration countdown (Backend TTL will replace later)
export function timeRemaining(ts, ttlMs = 30 * 60 * 1000) {
  return Math.max(0, ttlMs - (Date.now() - ts));
}
