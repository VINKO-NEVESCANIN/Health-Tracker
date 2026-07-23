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

export default api;
