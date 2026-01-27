export const API_BASE = "https://mahakavach-backend.onrender.com";

// export const API_BASE = "http://127.0.0.1:8000";
export async function fetchStations() {
  const res = await fetch(`${API_BASE}/api/v1/stations`);
  return res.json();
}

export async function fetchStationCrowd(code) {
  const res = await fetch(`${API_BASE}/api/v1/crowd/station/${code}`);
  return res.json();
}
