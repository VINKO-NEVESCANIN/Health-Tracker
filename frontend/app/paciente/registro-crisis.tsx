import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function RegistroCrisis() {
  const [evento, setEvento] = useState({
    descripcion: "",
    fecha: "",
    intensidad: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://192.168.1.10:4000/events", {  // 👈 cambia por tu IP local
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(evento), // 👈 aquí usamos `evento`
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Crisis guardada en backend:", data);
        Alert.alert("✅ Éxito", "Crisis registrada con éxito");
      } else {
        console.error("Error en backend:", await response.text());
        Alert.alert("❌ Error", "No se pudo registrar la crisis");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      Alert.alert("⚠️ Error", "No se pudo conectar con el servidor");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Crisis</Text>

      <TextInput
        style={styles.input}
        placeholder="Descripción del evento"
        placeholderTextColor="#a1a1aa"
        value={evento.descripcion}
        onChangeText={(v) => setEvento({ ...evento, descripcion: v })}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        placeholderTextColor="#a1a1aa"
        value={evento.fecha}
        onChangeText={(v) => setEvento({ ...evento, fecha: v })}
      />
      <TextInput
        style={styles.input}
        placeholder="Intensidad (1-10)"
        placeholderTextColor="#a1a1aa"
        keyboardType="numeric"
        value={evento.intensidad}
        onChangeText={(v) => setEvento({ ...evento, intensidad: v })}
      />

      <Button title="Registrar Crisis" color="#f472b6" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0a0a0a" },
  title: { fontSize: 22, fontWeight: "bold", color: "#f9fafb", marginBottom: 20 },
  input: {
    backgroundColor: "#1a1a1a",
    color: "#f9fafb",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
});
