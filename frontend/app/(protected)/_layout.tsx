import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@context/auth";

// El AuthProvider vive en app/_layout.tsx (raíz). Aquí solo protegemos
// el acceso: si no hay sesión, se manda de vuelta a login.
export default function ProtectedLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4ade80" />
      </View>
    );
  }

  if (!user) return <Redirect href="/(auth)/login" />;

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
