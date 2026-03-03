export const API_BASE_URL = "http://localhost:8000";

export async function fetchMessage() {
  const res = await fetch(`${API_BASE_URL}/api/message`);
  if (!res.ok) {
    throw new Error("Failed to fetch message");
  }
  return res.json();
}

export async function fetchPhotos() {
  const res = await fetch(`${API_BASE_URL}/api/photos`);
  if (!res.ok) {
    throw new Error("Failed to fetch photos");
  }
  return res.json();
}

export async function blowCandles() {
  const res = await fetch(`${API_BASE_URL}/api/blow-candles`, {
    method: "POST",
  });
  if (!res.ok) {
    throw new Error("Failed to blow candles");
  }
  return res.json();
}

export async function fetchBackgroundPhotos() {
  const res = await fetch(`${API_BASE_URL}/api/background-photos`);
  if (!res.ok) {
    throw new Error("Failed to fetch background photos");
  }
  return res.json();
}

