import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Image, ImageBackground } from "react-native";
import { useRouter } from 'expo-router';

export default function IndexScreen() {

  const [User, setUser] = useState("");
  const [Pass, setPass] = useState("");

  const router = useRouter();

  function lala() {
    console.log("Bienvenido:", User);

    router.push({
      pathname: '../doctor/MenuDoctor',
      params: {
        user: User,
        pass: Pass
      }
    });
  }

  return (

    <ImageBackground
      source={require('../../../assets/images/FondoApp.png')}
      style={styles.fondo}
      resizeMode="cover"
    >

      <View style={styles.container}>

        <Image
          source={require('../../Icon/LoginIcon.png')}
          style={styles.logo}
        />

        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={User}
          onChangeText={setUser}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={Pass}
          onChangeText={setPass}
          secureTextEntry
        />

        <Button title="Iniciar Sesion" onPress={lala} />

        <Text
          onPress={lala}
          style={styles.link}
        >
          Olvide Mi Contraseña...
        </Text>

      </View>

    </ImageBackground>

  );
}

const styles = StyleSheet.create({

  fondo: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    justifyContent: "center"
  },

  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20
  },

  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff"
  },

  link: {
    alignSelf: "center",
    marginTop: 15,
    textDecorationLine: "underline"
  }

});