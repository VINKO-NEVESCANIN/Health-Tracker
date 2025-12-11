import { router, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, FlatList, ImageBackground, StyleSheet, Text, TextInput, Dimensions, useWindowDimensions, Pressable} from "react-native";

export default function Pacientes() {
    const items = [
  { id: '1', name: 'Paciente 1', toto: 'hola', tata: 'adios', tete: 'saludos' },
  { id: '2', name: 'Paciente 2' },
  { id: '3', name: 'Paciente 1', toto: 'hola', tata: 'adios', tete: 'saludos' },
  { id: '4', name: 'Paciente 1', toto: 'hola', tata: 'adios', tete: 'saludos' }
  ]
  const [User, setUser] = useState("");
//  const { Width } = useWindowDimensions();
  return (
    <ImageBackground
     source={require('../../assets/FondoApp.png')} // Ruta de tu imagen
      style={styles.fondo}
      resizeMode="cover"
    >
    <View style={styles.pantalla}>

<TextInput
        style={styles.input}
        placeholder="Buscar Paciente"
        placeholderTextColor={"#000000ff"}
        value={User}
        onChangeText={setUser}
/>

<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  contentContainerStyle={styles.contenedor}
  renderItem={({ item }) => (
    <Pressable
          style={styles.ListaPacientes}
          onPress={() => router.push({
            pathname: '../../paciente/EditarPaciente',
            params: { id: item.id }
          })}
        >
          <Text>{item.name}</Text>
          <Text>{item.toto}</Text>
          <Text>{item.tata}</Text>
          <Text>{item.tete}</Text>
        </Pressable>

  )}
/>
      </View>
      </ImageBackground>
  );
}
const styles = StyleSheet.create({
  
  fondo:{
    flex: 1,
  },

  ListaPacientes:{
    backgroundColor: '#C9B1FF',
    justifyContent: 'center',
    width: '100%',
    height: 120,
    padding: 10,
    boxShadow: "16px 8px 16px rgba(0, 0, 0, 0.25)",
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 20,

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
