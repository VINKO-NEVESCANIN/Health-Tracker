import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { View, FlatList, ImageBackground, StyleSheet, Text } from "react-native";
import { getUserByDoctorId } from "@services/api";

//IMPORT DE IMAGEN (alias)
import fondo from '@assets/images/FondoApp.png';

export default function Pacientes() {

  const [userId, setUserId] = useState<number | null>(null);
    const [patients, setPatients] = useState<any[]>([]);
    
      useEffect(() => {
        const loadToken = async () => {
           console.log("No corre el Token");
          const token = await AsyncStorage.getItem("token"); // 👈 leer token
          if (token) {
            const decoded = jwtDecode<{ userId: number, role: string, doctorId: number }>(token); // 👈 decodificar
            setUserId(decoded.userId);
          }
        };
        loadToken();
      }, []);

      useEffect(() => {
  if (userId) {
    getUserByDoctorId(userId)
      .then((data) => {
        console.log("Pacientes recibidos:", data);
        setPatients(data);
      })
      .catch((err) => {
        console.error("Error cargando pacientes:", err.response?.data || err.message);
      });
  }
}, [userId]);

  return (
    <ImageBackground
      source={fondo}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.pantalla}>

        <FlatList
          data={patients}
          contentContainerStyle={styles.contenedor}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.ListaPacientes}>
              <Text>{item.firstName} {item.lastName}</Text>
              <Text>Email: {item.email}</Text>
              <Text>Edad: {item.age}</Text>
              <Text>Rol: {item.role}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={{textAlign: "center"}}>No hay pacientes asignados</Text>}
        />

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
  },

  ListaPacientes: {
    backgroundColor: '#C9B1FF',
    justifyContent: 'center',
    width: '100%',
    height: 120,
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 20,
    elevation: 4, // ✅ reemplazo de boxShadow
  },

  pantalla: {
    flex: 1,
    paddingTop: 40,
  },

  contenedor: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  fila: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  input: {
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: "#000000ff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    width: '90%',
  },
});