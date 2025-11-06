import { useRouter } from "expo-router";
import React from "react";
import { View, FlatList, ImageBackground, StyleSheet, Text} from "react-native";

export default function Pacientes() {
    const items = [
  { id: '1', name: 'Paciente 1', toto: 'hola', tata: 'adios', tete: 'saludos' },
  { id: '2', name: 'Paciente 2' },
  ]
  return (
    <ImageBackground
     source={require('../../assets/FondoApp.png')} // Ruta de tu imagen
      style={styles.fondo}
      resizeMode="cover"
    >
    <View style={styles.container}>

<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.ListaPacientes}>
      <Text>{item.name}</Text>
        <Text>{item.toto}</Text>
        <Text>{item.tata}</Text>
        <Text>{item.tete}</Text>
    </View>

  )}
/>


      </View>
      </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50,  flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#000000ff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },

  fondo:{
    flex: 1,
  },

  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemText: { 
    fontWeight: "bold", 
    marginTop: 97,
    marginLeft: 20,
    position: 'absolute',
    
  },

  BtnIzquierda:{
     width: 100, 
     height: 100,
     marginBottom: 20,
     alignSelf: 'center',
     borderRadius: 20,
  },

  ListaPacientes:{
    borderWidth: 1,
    borderColor: "#000000ff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,

  },

  StylePress:{
    backgroundColor: "#C9B1FF",
    width: 120,
    height: 120,
    boxShadow: "16px 8px 16px rgba(0, 0, 0, 0.25)",
    borderRadius: 20,
    borderWidth: 2  
  }

});
