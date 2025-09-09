import React from "react";
import { View, Text } from "react-native";

export default function InicioScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>🏠 Bienvenido a Health Tracker</Text>
      <Text>Noticias, información general y recordatorios</Text>
    </View>
  );
}
