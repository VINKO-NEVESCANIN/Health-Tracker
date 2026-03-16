import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ⚠️ Usa la IP de tu máquina en la red local, no "localhost"
const API_URL = "http://192.168.100.35:4000"; 

// Servicio de login
export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  const token = res.data.token;

  // Guardar token en AsyncStorage
  await AsyncStorage.setItem("token", token);

  return token;
};

// Servicio para obtener pacientes
export const getPatients = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No hay token guardado en AsyncStorage");

    const res = await axios.get(`${API_URL}/patients`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("Respuesta backend pacientes:", res.data);

    // Si el backend devuelve { patients: [...] }
    if (res.data.patients) {
      return res.data.patients;
    }

    // Si devuelve directamente un arreglo [...]
    return res.data;
  } catch (err: any) {
    console.error("Error en getPatients:", err.response?.data || err.message);
    throw err;
  }
};
