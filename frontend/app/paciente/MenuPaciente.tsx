import { RelativePathString, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {Image, Pressable, Text, StyleSheet,View, ImageBackground, FlatList} from "react-native";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MenuPaciente() {

    const [patientId, setPatientId] = useState<number | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("token"); // 👈 leer token
      if (token) {
        const decoded = jwtDecode<{ userId: number }>(token); // 👈 decodificar
        setPatientId(decoded.userId);
      }
    };
    loadToken();
  }, []);

  //TIPEO DE BOTONES
    type Boton = {
    id: number;
    title: string;
    image: any;
    ruta: RelativePathString;
  };
  
  //ARRAY DE BOTONES DE MENU
    const Botones: Boton[] = [
      { id: 1, title: 'Mis Citas', image: require("../Icon/Mis Citas.png"), ruta: '../paciente/MIsCitas' },
      { id: 2, title: 'Registrar Crisis', image: require("../Icon/Registrar Crisis.png"), ruta: '../paciente/RegistroCrisis' },
      { id: 3, title: 'Epileptograma', image: require("../Icon/Epileptograma.png"), ruta: '../doctor/Epileptograma' },
      { id: 4, title: 'Mis Crisis', image: require("../Icon/Mis Crisis.png"), ruta: '../doctor/MisCrisis' },
      { id: 5, title: 'Medicamentos', image: require("../Icon/MisMedicamentos.png"), ruta: '../paciente/MisMedicamentos' },
      { id: 6, title: 'Estudios', image: require("../Icon/Estudios.png"), ruta: '../paciente/EstudiosPrevios' },
    ];

  type Params = {
  user?: string;
};
  const {  user } = useLocalSearchParams<Params>(); // Aquí puedes obtener los parámetros de la ruta si es necesario

  return (
    <ImageBackground
     source={require('../../assets/FondoApp.png')} // Ruta de tu imagen
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
            onPress={() => router.push({ pathname: item.ruta })}
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
