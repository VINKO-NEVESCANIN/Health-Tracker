import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} {...props} />;
}

export default function PacienteLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#f472b6",
        tabBarInactiveTintColor: "#a1a1aa",
        tabBarStyle: {
          backgroundColor: "#0a0a0a",
        },
        headerStyle: { backgroundColor: "#0a0a0a" },
        headerTintColor: "#f9fafb",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="registro-crisis"
        options={{
          title: "Registro",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="exclamation-triangle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="historial-crisis"
        options={{
          title: "Historial",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="history" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
