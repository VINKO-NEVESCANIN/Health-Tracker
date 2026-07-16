import { useRouter } from "expo-router";
import React from "react";
import { View, FlatList, ImageBackground, StyleSheet, Text } from "react-native";

// ✅ IMPORT DE IMAGEN (alias)
import fondo from '@assets/images/FondoApp.png';

export default function Pacientes() {

  const items = [
    { id: '1', name: 'Paciente 1', toto: 'hola', tata: 'adios', tete: 'saludos' },
    { id: '2', name: 'Paciente 2' },
  ];

  return (
    <ImageBackground
      source={fondo}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.pantalla}>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.contenedor}
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