import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ⚠️ Usa la IP de tu máquina en la red local, no "localhost" (Expo Go corre en el celular)
// TODO: mover a variable de entorno (app.config.ts / EAS) antes de compilar para producción.
export const API_URL = "http://192.168.50.171:4000";

const api = axios.create({ baseURL: API_URL });

// Adjunta el token guardado a cada request automáticamente
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tipos básicos devueltos por el backend (auth.controller.ts)
export type Role = "Paciente" | "Doctor" | string;

export interface AuthUser {
  id: number;
  firstName: string | null;
  lastName?: string | null;
  email: string;
  role: Role;
  firstTime?: boolean;
}

// ---------- Auth ----------
export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  const { token, user } = res.data as { token: string; user: AuthUser };
  await AsyncStorage.setItem("token", token);
  return { token, user };
};

export const register = async (
  firstName: string,
  email: string,
  password: string,
  role: string
) => {
  const res = await api.post("/auth/register", { firstName, email, password, role });
  const { token, user } = res.data as { token: string; user: AuthUser };
  // El backend ya regresa token en el registro, así que dejamos al usuario logueado
  if (token) await AsyncStorage.setItem("token", token);
  return { token, user };
};

// Restaura la sesión a partir del token guardado (usado al abrir la app)
export const getMe = async (): Promise<AuthUser | null> => {
  const token = await AsyncStorage.getItem("token");
  if (!token) return null;
  const res = await api.get("/auth/me");
  return res.data.user as AuthUser;
};

export const logout = async () => {
  await AsyncStorage.removeItem("token");
};

// ---------- Usuarios (pacientes/doctores viven en el mismo modelo User) ----------
export const getUsers = async (opts?: { search?: string; role?: string }) => {
  const res = await api.get("/users", { params: opts });
  return res.data.users ?? res.data;
};

export const getUserById = async (id: number) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

export const createPatient = async (data: {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  doctorId?: number;
}) => {
  const res = await api.post("/users", { ...data, role: "Paciente" });
  return res.data;
};

export const createUser = async (
  firstName: string,
  email: string,
  password: string,
  role: string
) => {
  const res = await api.post("/users", { firstName, email, password, role });
  return res.data;
};

export const updateInfo = async (id: number, data: any) => {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
};

export const updateAccess = async (id: number, data: any) => {
  const res = await api.put(`/users/${id}/access`, data);
  return res.data;
};

// ---------- Crisis ----------
// Antes apuntaba a "/RegistroCrisis", que no existe en el backend (server.ts expone "/crisis")
export const createCrisis = async (data: any) => {
  const res = await api.post("/crisis", data);
  return res.data;
};

export const getPatientCrisis = async (patientId: number) => {
  const res = await api.get(`/crisis/${patientId}`);
  return res.data;
};

// ---------- Medicamentos ----------
export const getMedicationsCatalog = async () => {
  const res = await api.get("/medications");
  return res.data;
};

export const createMedicationCatalog = async (data: { name: string; type?: string; abbreviation?: string }) => {
  const res = await api.post("/medications", data);
  return res.data;
};

export const getPatientMedications = async (patientId: number) => {
  const res = await api.get(`/patient-medications/${patientId}`);
  return res.data;
};

export const assignMedication = async (data: {
  patientId: number;
  medicationId: number;
  name?: string;
  dose?: string;
  interval?: string;
  presentation?: string;
}) => {
  const res = await api.post("/patient-medications", data);
  return res.data;
};

export const deletePatientMedication = async (id: number) => {
  const res = await api.delete(`/patient-medications/${id}`);
  return res.data;
};

// ---------- Citas ----------
export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  date: string;
  time: string;
  notes: string | null;
  status: string;
  patient: { id: number; firstName: string | null; lastName: string | null; age: number | null; epilepsyType: string | null } | null;
  doctor: { id: number; firstName: string | null; lastName: string | null } | null;
}

export const getAppointments = async (): Promise<Appointment[]> => {
  const res = await api.get("/appointments");
  return res.data;
};

export const getMyAppointments = async (): Promise<Appointment[]> => {
  const res = await api.get("/appointments/mine");
  return res.data;
};

export const createAppointment = async (data: { patientId: number; date: string; time: string; notes?: string }) => {
  const res = await api.post("/appointments", data);
  return res.data;
};

export const updateAppointment = async (id: number, data: { date?: string; time?: string; notes?: string; status?: string }) => {
  const res = await api.put(`/appointments/${id}`, data);
  return res.data;
};

export const deleteAppointment = async (id: number) => {
  const res = await api.delete(`/appointments/${id}`);
  return res.data;
};

// ---------- Estudios ----------
export interface Study {
  id: number;
  patientId: number;
  dateEEG: string | null;
  dateNSMAP: string | null;
  dateRMNC: string | null;
  resEEG: string | null;
  resNSMAP: string | null;
  resRMNC: string | null;
  patient?: { id: number; firstName: string | null; lastName: string | null };
}

export const getAllStudies = async (): Promise<Study[]> => {
  const res = await api.get("/studies");
  return res.data;
};

export const getPatientStudies = async (patientId: number): Promise<Study[]> => {
  const res = await api.get(`/studies/patient/${patientId}`);
  return res.data;
};

export const createStudy = async (data: Partial<Study> & { patientId: number }) => {
  const res = await api.post("/studies", data);
  return res.data;
};

export const updateStudy = async (id: number, data: Partial<Study>) => {
  const res = await api.put(`/studies/${id}`, data);
  return res.data;
};

// ---------- Resumen del doctor ----------
export const getDoctorSummary = async (): Promise<{ appointmentsToday: number; activePatients: number; crisisLast7Days: number }> => {
  const res = await api.get("/summary");
  return res.data;
};

export default api;
