import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, TextInput, Image, useNavigation} from "react-native";
import { router, useRouter } from 'expo-router';

export default function IndexScreen() {
  const [User, setUser] = useState("");
  const [Pass, setPass] = useState("");
  const Router = useRouter();
  
  function lala() {
    console.log("Bienvenido:", User)
    Router.push({
      pathname:'../doctor/MenuDoctor',
      params: { 
        user: User,
        pass: Pass
       }
    });
   }


  return (
    <View style={styles.container}>

      <Image
        source={require('../Icon/LoginIcon.png')}
        style={{ width: 100, height: 100, alignSelf: 'center', marginBottom: 20 }}
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
      />

      <Button title="Iniciar Sesion" onPress={lala} />
      <Text onPress={lala} style={{alignSelf:"center", textDecorationLine:"underline"}}>
        Olvide Mi Contraseña...</Text>
    </View>
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
  itemText: { fontWeight: "bold" },
});
