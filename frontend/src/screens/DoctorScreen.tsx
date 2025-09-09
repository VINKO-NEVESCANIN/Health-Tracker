import React from "react";
import { View, Text, FlatList } from "react-native";

const pacientes = [
  { id: "1", nombre: "Juan Pérez", episodios: 3 },
  { id: "2", nombre: "María López", episodios: 1 },
  { id: "3", nombre: "Carlos Sánchez", episodios: 5 },
];

export default function DoctorScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>👨‍⚕️ Pacientes</Text>
      <FlatList
        data={pacientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.nombre}</Text>
            <Text>Episodios registrados: {item.episodios}</Text>
          </View>
        )}
      />
    </View>
  );
}
