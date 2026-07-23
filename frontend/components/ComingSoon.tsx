import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ComingSoon({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Esta pantalla está en construcción 🚧</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: { color: "#f9fafb", fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  subtitle: { color: "#a1a1aa", fontSize: 14, textAlign: "center" },
});
