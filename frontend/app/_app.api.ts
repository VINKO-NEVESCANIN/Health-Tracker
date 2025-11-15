// app/_app.api.ts
export const API_URL = 'http://192.168.50.125:4000/api'; //  IP local

export async function createPatient(data) {
  const res = await fetch(`${API_URL}/pacientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function getPatients() {
  const res = await fetch(`${API_URL}/pacientes`);
  return await res.json();
}

export async function getEvents() {
  const res = await fetch(`${API_URL}/events`);
  return await res.json();
}
