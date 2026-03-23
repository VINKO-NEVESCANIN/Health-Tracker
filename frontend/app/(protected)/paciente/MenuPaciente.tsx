import { router, useLocalSearchParams, Href } from "expo-router";
import React from "react";
import { Image, Pressable, Text, StyleSheet, View, ImageBackground, FlatList } from "react-native";

// ✅ IMPORTS
import loginIcon from '@assets/icon/LoginIcon.png';
import fondo from '@assets/images/FondoApp.png';

export default function MenuPaciente() {

  type Boton = {
    id: number;
    title: string;
    image: any;
    ruta: Href;
  };

  const Botones: Boton[] = [
    { id: 1, title: 'Mis Citas', image: loginIcon, ruta: '/paciente/MIsCitas' },
    { id: 2, title: 'Registrar Crisis', image: loginIcon, ruta: '/paciente/RegistroCrisis' },
    { id: 3, title: 'EpileptoGrama', image: loginIcon, ruta: '/doctor/EpileptoGrama' },
    { id: 4, title: 'Mis Crisis', image: loginIcon, ruta: '/doctor/MisCrisis' },
    { id: 5, title: 'Medicamentos', image: loginIcon, ruta: '/doctor/medicamentos' },
    { id: 6, title: 'Estudios', image: loginIcon, ruta: '/doctor/estudios' },
  ];

  const { user } = useLocalSearchParams<{ user?: string }>();

  return (
    <ImageBackground source={fondo} style={styles.fondo} resizeMode="cover">
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
  fondo:{
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
    boxShadow: "16px 8px 16px rgba(0, 0, 0, 0.25)",
    borderRadius: 20,
    borderWidth: 2
  },
  imagen: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  texto: {
    color: 'Black',
    fontSize: 16,
      }

});
