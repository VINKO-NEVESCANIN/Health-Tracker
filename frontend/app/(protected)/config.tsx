import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useAuth } from "@context/auth";

export default function ConfigScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes</Text>
      {user && (
        <Text style={styles.info}>
          {user.firstName ?? user.email} · {user.role}
        </Text>
      )}
      <Pressable style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a", padding: 24, paddingTop: 60 },
  title: { color: "#f9fafb", fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  info: { color: "#a1a1aa", fontSize: 14, marginBottom: 32 },
  button: {
    backgroundColor: "#27272a",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: { color: "#f87171", fontWeight: "bold", fontSize: 16 },
});
