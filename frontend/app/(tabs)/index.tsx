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
      await login(User, Pass); // 👈 usamos el servicio
      Router.push("../paciente/Pacientes"); // 👈 navega a pacientes
    } catch (err: any) {
      console.error("Error en login:", err.response?.data || err.message);
      setError("Credenciales inválidas o error de conexión");
    }
  }


  return (
      <ImageBackground
           source={fondo} // Ruta de tu imagen
            style={styles.fondo}
            resizeMode="cover"
          >
    <View style={styles.container}>

      <Image
        source={loginIcon}
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

      <Button title="Iniciar Sesion" onPress={handleLogin} />
      <Text onPress={handleLogin} style={{alignSelf:"center", textDecorationLine:"underline"}}>
        Olvide Mi Contraseña...</Text>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
   fondo:{
    flex: 1,
  },
  itemText: { fontWeight: "bold" },
});
