import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

// Componente reutilizable para los iconos de la barra
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={22} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4ade80", // Verde cuando está activo
        tabBarInactiveTintColor: "#a1a1aa", // Gris cuando está inactivo
        tabBarStyle: {
          backgroundColor: "#0a0a0a", // Fondo negro
          borderTopColor: "#27272a",
        },
        headerStyle: {
          backgroundColor: "#0a0a0a", // Header oscuro
        },
        headerTintColor: "#f9fafb", // Texto claro
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="paciente"
        options={{
          title: "Paciente",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="heartbeat" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="doctor"
        options={{
          title: "Doctor",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="stethoscope" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="medicamentos"
        options={{
          title: "Medicamentos",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="medkit" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="estudios"
        options={{
          title: "Estudios",
          tabBarIcon: ({ color }) => <TabBarIcon name="flask" color={color} />,
        }}
      />

      <Tabs.Screen
        name="emergencias"
        options={{
          title: "Emergencias",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ambulance" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="configuracion"
        options={{
          title: "Config",
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
