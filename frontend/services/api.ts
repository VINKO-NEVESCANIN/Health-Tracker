import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ⚠️ Usa la IP de tu máquina en la red local, no "localhost"
const API_URL = "http://192.168.100.35:4000"; 

// Servicio de login
export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  const {token, user} = res.data;

  // Guardar token en AsyncStorage
  await AsyncStorage.setItem("token", res.data.token);

  return {token, user};
};

// Servicio para crear Usuarios
export const createUser = async (firstName: string, email: string, password: string, role: string) => {
  const token = await AsyncStorage.getItem("token");
  const res = await axios.post(`${API_URL}/auth/register`, {firstName, email, password, role }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Servicio para obtener usuarios
export const getUsers = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No hay token guardado en AsyncStorage");

    const res = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("Respuesta backend pacientes:", res.data);

    // Si el backend devuelve { users: [...] }
    if (res.data.users) {
      return res.data.users;
    }

    // Si devuelve directamente un arreglo [...]
    return res.data;
  } catch (err: any) {
    console.error("Error en getPatients:", err.response?.data || err.message);
    throw err;
  }
};

export const updateInfo = async (id: number, data: any) => {
  const token = await AsyncStorage.getItem("token");
  const res = await axios.put(`${API_URL}/users/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateAccess = async (id: number, data: any) => {
  const token = await AsyncStorage.getItem("token");
  const res = await axios.put(`${API_URL}/patients/${id}/access`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getUserById = async (id: number) => {
  const token = await AsyncStorage.getItem("token");
  const res = await axios.get(`${API_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createCrisis = async (data: any) => {
  const token = await AsyncStorage.getItem("token");
  const res = await axios.post(`${API_URL}/crisis`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getCrisisById = async (id: number) => {
  const token = await AsyncStorage.getItem("token");
  const res = await axios.get(`${API_URL}/crisis/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createStudy = async (data: any) => {
  const token = await AsyncStorage.getItem("token");
  const res = await axios.post(`${API_URL}/studies`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getPatientStudies = async (patientId: number) => {
  const token = await AsyncStorage.getItem("token");
  const res = await axios.get(`${API_URL}/studies/${patientId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const upsertStudy = async (data: any) => {
  const token = await AsyncStorage.getItem("token");
  const res = await axios.post(`${API_URL}/studies/upsert`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getUserByDoctorId = async (doctorId: number) => {
  const token = await AsyncStorage.getItem("token");
  const res = await axios.get(`${API_URL}/users/doctor/${doctorId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getMedications = async () => {
  const token = await AsyncStorage.getItem("token");
  const res = await axios.get(`${API_URL}/medications`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createPatientMedication = async (data: any) => {
  const token = await AsyncStorage.getItem("token");
  const res = await axios.post(`${API_URL}/patient-medications`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
