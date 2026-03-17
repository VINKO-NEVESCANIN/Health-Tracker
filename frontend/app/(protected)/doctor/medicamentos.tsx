import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function Medicamentos() {
  const [med, setMed] = useState({
    nombre: "",
    dosis: "",
    frecuencia: "",
  });

  const handleSubmit = () => {
    console.log("Medicamento registrado:", med);
    // POST al backend
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Medicamento</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del medicamento"
        placeholderTextColor="#a1a1aa"
        value={med.nombre}
        onChangeText={(v) => setMed({ ...med, nombre: v })}
      />
      <TextInput
        style={styles.input}
        placeholder="Dosis (ej. 500mg)"
        placeholderTextColor="#a1a1aa"
        value={med.dosis}
        onChangeText={(v) => setMed({ ...med, dosis: v })}
      />
      <TextInput
        style={styles.input}
        placeholder="Frecuencia (ej. cada 8h)"
        placeholderTextColor="#a1a1aa"
        value={med.frecuencia}
        onChangeText={(v) => setMed({ ...med, frecuencia: v })}
      />

      <Button title="Guardar Medicamento" color="#22d3ee" onPress={handleSubmit} />
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
