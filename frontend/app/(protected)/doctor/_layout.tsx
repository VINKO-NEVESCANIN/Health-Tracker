import React from "react";
import { Stack } from "expo-router";
import { theme } from "@constants/theme";

// Stack (sin tabs): el menú es la pantalla principal y cada pantalla se abre
// encima con botón de regresar. Con Tabs, las pantallas no declaradas no
// navegaban bien desde los botones del menú.
export default function DoctorLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.purple600 },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        contentStyle: { backgroundColor: theme.purple100 },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="GestionarCitas" options={{ title: "Mis Citas" }} />
      <Stack.Screen name="CrisisRecientes" options={{ headerShown: false }} />
      <Stack.Screen name="EpileptoGrama" options={{ headerShown: false }} />
      <Stack.Screen name="AgregarPaciente" options={{ headerShown: false }} />
      <Stack.Screen name="medicamentos" options={{ headerShown: false }} />
      <Stack.Screen name="estudios" options={{ title: "Estudios" }} />
    </Stack>
  );
}
