import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, TextInput, Image, ImageBackground} from "react-native";
import { router, useRouter } from 'expo-router';
import { login } from "../../services/api";// cambiar ruta relativa a asoluta para evitar errores
import fondo from '@assets/images/FondoApp.png';
import loginIcon from '@assets/icon/LoginIcon.png';

export default function IndexScreen() {
  const [User, setUser] = useState("");
  const [Pass, setPass] = useState("");
  const [error, setError] = useState(""); 
  const Router = useRouter();
  
  async function handleLogin() {
    try {
      const Userdata = await login(User, Pass); // 👈 usamos el servicio
      if (Userdata.user.role === "Paciente" && Userdata.user.firstTime === true) {
        Router.push({
      pathname:"../paciente/EditarPaciente",
      params: { id: Userdata.user.id } // 👈 pasamos el id del paciente
        })
      } else if (Userdata.user.role === "Paciente" && Userdata.user.firstTime === false) {
        Router.push({
      pathname:"../paciente/MenuPaciente", 
      params: { id: Userdata.user.id }}) // 👈 navega a MenuPaciente
      } else if (Userdata.user.role === "Doctor") {
        Router.push({
          pathname: "../doctor/MenuDoctor",
          params: { id: Userdata.user.id } // 👈 pasamos el id del doctor
        }); // 👈 navega a MenuDoctor
      }

          {/*}   if (Userdata.user.role === "Paciente"  && Userdata.user.firstTime === true) {
        Router.push({
          pathname:"../paciente/MenuPaciente",
          params: { patientId: Userdata.user.id } // 👈 pasamos el patientId
        })
        }); // 👈 navega a MenuPaciente
      } else if (Userdata.user.role === "Doctor") {
        Router.push("../doctor/MenuDoctor"); // 👈 navega a MenuDoctor
      }
   {*/}
    } catch (err: any) {
      console.error("Error en login:", err.response?.data || err.message);
      setError("Credenciales inválidas o error de conexión");
    }
  }


  return (
      <ImageBackground
           source={require('../../assets/FondoApp.png')} // Ruta de tu imagen
            style={styles.fondo}
            resizeMode="cover"
          >
    <View style={styles.container}>

      <Image
        source={require('../Icon/LoginIcon.png')}
        style={{ width: 100, height: 100, alignSelf: 'center', marginBottom: 20 }}
      />
      
      <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={User}
        onChangeText={setUser}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={Pass}
        onChangeText={setPass}
        secureTextEntry
      />
      </View>

    <View style={styles.buttonContainer}>
      <Button title="Iniciar Sesion" onPress={handleLogin} />      
        </View>

     <View style={styles.buttonContainer}>
      <Button title="Crear Usuario" onPress={() => router.push("../../Register")} />
      </View>   

      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  container: { flex: 1, padding: 20, marginTop: 50 },

  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },

  input: {
    borderWidth: 1,
    borderColor: "#000000ff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
   fondo:{
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center"
  },
  itemText: { fontWeight: "bold" },
});