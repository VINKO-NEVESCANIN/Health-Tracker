import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, Button, StyleSheet, TextInput, ImageBackground} from "react-native";
import {useRouter } from 'expo-router';
import { createUser} from "@/services/api";

export default function IndexScreen() {
  const [User, setUser] = useState("");
  const [Pass, setPass] = useState("");
  const [ConfirmPass, setConfirmPass] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Paciente");
  const [error, setError] = useState(""); 
  const Router = useRouter();
  
  async function CrearUsuario() {
    try {
      if (Pass !== ConfirmPass) {
        setError("Las contraseñas no coinciden");
        console.log("Las contraseñas no coinciden");
        return;
      }

      const Userdata = await createUser(User, email, Pass, role); // 👈 usamos el servicio
      
      console.log("Usuario creado:", Userdata);

      Router.push("/"); // 👈 navega a la pantalla de login después de crear el usuario
    } catch (err: any) {
      console.error("Error en crear el usuario:", err.response?.data || err.message);
      setError("Credenciales inválidas o error de conexión");
    }
  }


  return (
      <ImageBackground
           source={require('../../assets/FondoApp.png')} // Ruta de tu imagen
            style={styles.fondo}
            resizeMode="cover"
          >
    <ScrollView>
      
      <View style={styles.container}>
    <Text style={styles.textLbl}>Ingrese su Usuario: </Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={User}
        onChangeText={setUser}
        autoCapitalize="none"
      />

    <Text style={styles.textLbl}>Ingrese su Correo Electrónico: </Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

    <Text style={styles.textLbl}>Ingrese su Contraseña: </Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={Pass}
        onChangeText={setPass}
        secureTextEntry
      />

    <Text style={styles.textLbl}>Confirme su Contraseña: </Text>
      <TextInput
        style={styles.input}
        placeholder="Confirme su Contraseña"
        value={ConfirmPass}
        onChangeText={setConfirmPass}
        secureTextEntry
      />
      </View>
    
    <View style={styles.buttonContainer}>
      <Button title="Crear Usuario" onPress={CrearUsuario} />
        </View>
        
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  container: { padding: 20, marginTop: 50 },

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

  textLbl: {
    paddingBottom: 10,
  },
});
