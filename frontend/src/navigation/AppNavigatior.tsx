import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";

const Tab = createBottomTabNavigator();

// Pantallas placeholder (las vas a reemplazar por componentes reales)
function HomeScreen() {
  return <View><Text>Pantalla de Inicio</Text></View>;
}

function RegistroScreen() {
  return <View><Text>Pantalla de Registro</Text></View>;
}

function DoctorScreen() {
  return <View><Text>Pantalla del Doctor</Text></View>;
}

function PacienteScreen() {
  return <View><Text>Pantalla del Paciente</Text></View>;
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="Registro" component={RegistroScreen} />
        <Tab.Screen name="Doctor" component={DoctorScreen} />
        <Tab.Screen name="Paciente" component={PacienteScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
