import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

export default function RegistroScreen() {
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!description.trim()) {
      Alert.alert("Error", "La descripción no puede estar vacía");
      return;
    }

    await fetch("http://localhost:4000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });

    Alert.alert("✅ Registro guardado");
    setDescription("");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>📝 Registrar Episodio</Text>

      <TextInput
        placeholder="Describe el episodio..."
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
      />

      <Button title="Guardar" onPress={handleSubmit} />
    </View>
  );
}
