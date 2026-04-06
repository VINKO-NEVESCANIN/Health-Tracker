import { RelativePathString, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, StyleSheet, View, ImageBackground, FlatList } from "react-native";

// ✅ IMPORTS DE IMÁGENES
import fondo from "@assets/images/FondoApp.png";
import gestionarCitas from "@assets/icon/GestionarCitas.png";
import pacientesIcon from "@assets/icon/Pacientes.png";
import crisisIcon from "@assets/icon/CrisisRecientes.png";
import epileptoIcon from "@assets/icon/Epileptograma.png";
import { Href } from "expo-router";

export default function MenuDoctor() {

  type Boton = {
  id: number;
  title: string;
  image: any;
  ruta: Href; //  Clave de funcionamiento
};

  // ✅ BOTONES LIMPIOS
  const Botones: Boton[] = [
    { id: 1, title: 'Gestionar Cita', image: gestionarCitas, ruta: '/doctor/GestionarCitas' },
    { id: 2, title: 'Pacientes', image: pacientesIcon, ruta: '/paciente/Pacientes' },
    { id: 3, title: 'Crisis Recientes', image: crisisIcon, ruta: '/doctor/CrisisRecientes' },
    { id: 4, title: 'Epileptograma', image: epileptoIcon, ruta: '/doctor/EpileptoGrama' },
  ];

  const router = useRouter();

  // (opcional si usas params)
  const { user } = useLocalSearchParams<{ user?: string }>();

  return (
    <ImageBackground
      source={fondo}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.pantalla}>
        <FlatList
          data={Botones}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.contenedor}
          columnWrapperStyle={styles.fila}
          renderItem={({ item }) => (
            <Pressable
              style={styles.boton}
              onPress={() => router.push(item.ruta)}
            >
              <Image source={item.image} style={styles.imagen} />
              <Text style={styles.texto}>{item.title}</Text>
            </Pressable>
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
  boton: {
    backgroundColor: '#C9B1FF',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: 120,
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
  },
  imagen: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  texto: {
    color: 'black',
    fontSize: 16,
  }
});