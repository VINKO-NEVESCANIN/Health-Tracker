import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

export default function RegistroScreen() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!description.trim()) {
      Alert.alert("Error", "La descripción no puede estar vacía");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://192.168.50.125:4000/crisis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error del servidor");
      }

      Alert.alert("✅ Episodio guardado correctamente");
      setDescription("");

    } catch (error: any) {
      Alert.alert("Error de conexión", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        📝 Registrar Episodio
      </Text>

      <TextInput
        placeholder="Describe el episodio..."
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
      />

      <Button title={loading ? "Guardando..." : "Guardar"} onPress={handleSubmit} />
    </View>
  );
}
