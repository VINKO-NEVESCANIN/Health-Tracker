import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "@context/auth";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4ade80" />
      </View>
    );
  }

  if (!user) return <Redirect href="/(auth)/login" />;
  return <Redirect href="/(protected)/home" />;
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
};
