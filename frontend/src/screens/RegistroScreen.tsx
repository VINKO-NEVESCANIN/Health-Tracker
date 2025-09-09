import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

export default function RegistroScreen() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleRegistro = () => {
    console.log("Guardado:", { titulo, descripcion });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>📝 Registrar ataque</Text>
      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={{ borderWidth: 1, marginVertical: 10, padding: 8, borderRadius: 8 }}
      />
      <TextInput
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        style={{ borderWidth: 1, marginVertical: 10, padding: 8, borderRadius: 8 }}
      />
      <Button title="Guardar" onPress={handleRegistro} />
    </View>
  );
}
