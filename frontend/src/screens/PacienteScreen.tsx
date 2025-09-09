import React from "react";
import { View, Text, FlatList } from "react-native";

const episodios = [
  { id: "1", fecha: "2025-08-25", titulo: "Ataque leve", descripcion: "Duró 10 minutos" },
  { id: "2", fecha: "2025-08-28", titulo: "Ataque fuerte", descripcion: "Tuve que ir al médico" },
];

export default function PacienteScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>🧑‍🤝‍🧑 Mi Historial</Text>
      <FlatList
        data={episodios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: "bold" }}>{item.fecha} - {item.titulo}</Text>
            <Text>{item.descripcion}</Text>
          </View>
        )}
      />
    </View>
  );
}
