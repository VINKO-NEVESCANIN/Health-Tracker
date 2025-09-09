import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import InicioScreen from "../screens/InicioScreen";
import RegistroScreen from "../screens/RegistroScreen";
import DoctorScreen from "../screens/DoctorScreen";
import PacienteScreen from "../screens/PacienteScreen";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Tabs principales
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={InicioScreen} />
      <Tab.Screen name="Registro" component={RegistroScreen} />
      <Tab.Screen name="Doctor" component={DoctorScreen} />
      <Tab.Screen name="Paciente" component={PacienteScreen} />
    </Tab.Navigator>
  );
}

// Drawer (menú lateral con tres rayas)
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Principal" component={MainTabs} />
        <Drawer.Screen name="Configuración" component={InicioScreen} />
        <Drawer.Screen name="Perfil" component={PacienteScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
