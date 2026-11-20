import React from "react";
import { Stack } from "expo-router";
import { theme } from "@constants/theme";

export default function PacienteLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.purple600 },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Pacientes" options={{ headerShown: false }} />
      <Stack.Screen name="PerfilPaciente" options={{ headerShown: false }} />
      <Stack.Screen name="EditarPaciente" options={{ title: "Editar paciente" }} />
      <Stack.Screen name="RegistroCrisis" options={{ title: "Registrar crisis" }} />
      <Stack.Screen name="HistorialCrisis" options={{ title: "Historial de crisis" }} />
      <Stack.Screen name="MisCitas" options={{ title: "Mis Citas" }} />
      <Stack.Screen name="EditarCita" options={{ title: "Cita" }} />
      <Stack.Screen name="EstudiosPrevios" options={{ title: "Estudios" }} />
    </Stack>
  );
}
