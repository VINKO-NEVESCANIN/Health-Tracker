import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Image, ImageBackground } from "react-native";
import { useRouter } from 'expo-router';

import fondo from '@assets/images/FondoApp.png'
import loginIcon from '@icons/LoginIcon.png'

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
      source={fondo}
      style={styles.fondo}
      resizeMode="cover"
    >

      <View style={styles.container}>

        <Image
          source={loginIcon}
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