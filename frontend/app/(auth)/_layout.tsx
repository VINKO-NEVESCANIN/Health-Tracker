import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@context/auth";

export default function AuthLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4ade80" />
      </View>
    );
  }

  // Si ya hay sesión activa, no tiene sentido mostrar login/registro.
  if (user) return <Redirect href="/(protected)/home" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
};
