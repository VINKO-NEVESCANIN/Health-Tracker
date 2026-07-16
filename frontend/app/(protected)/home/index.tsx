import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "@context/auth";

// Punto de entrada tras el login: manda a cada rol a su menú.
export default function Home() {
  const { user } = useAuth();

  if (!user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4ade80" />
      </View>
    );
  }

  if (user.role?.toLowerCase() === "doctor") {
    return <Redirect href="/(protected)/doctor" />;
  }
  return <Redirect href="/(protected)/paciente" />;
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
};
