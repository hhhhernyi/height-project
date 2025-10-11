// services/heightsService.ts
const API_BASE_URL =
  import.meta.env.VITE_BACK_END_SERVER_URL ?? "http://localhost:4000";
const API_ENDPOINT = `${API_BASE_URL}/heights`;

export type HeightRecord = {
  name: string;   // "HY", "HP", "HS", "HR"
  height: number;
};

export type HeightPayload = {
  records: HeightRecord[];
  pin: string;
};

// GET all heights
export async function fetchHeights() {
  const res = await fetch(API_ENDPOINT);
  if (!res.ok) throw new Error(`Server error: ${res.status}`);
  return res.json();
}

// POST new heights
export async function postHeights(payload: HeightPayload) {
  const res = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Server error: ${res.status}`);
  return res.json();
}
