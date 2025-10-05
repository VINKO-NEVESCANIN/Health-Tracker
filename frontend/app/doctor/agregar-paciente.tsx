import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";

export default function AgregarPaciente() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    telefono: "",
    direccion: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Nuevo paciente:", form);
    // Aquí haces fetch o axios POST al backend
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Agregar Paciente</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#a1a1aa"
        value={form.nombre}
        onChangeText={(v) => handleChange("nombre", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        placeholderTextColor="#a1a1aa"
        value={form.apellido}
        onChangeText={(v) => handleChange("apellido", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        keyboardType="numeric"
        placeholderTextColor="#a1a1aa"
        value={form.edad}
        onChangeText={(v) => handleChange("edad", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        keyboardType="phone-pad"
        placeholderTextColor="#a1a1aa"
        value={form.telefono}
        onChangeText={(v) => handleChange("telefono", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        placeholderTextColor="#a1a1aa"
        value={form.direccion}
        onChangeText={(v) => handleChange("direccion", v)}
      />

      <Button title="Guardar Paciente" color="#22d3ee" onPress={handleSubmit} />
    </ScrollView>
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
