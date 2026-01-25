import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button } from "react-native";
import { ImageBackground } from "react-native";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function MisMedicamentos() {
  const [cards, setCards] = useState([
    { id: 1, title: "Tarjeta 1", content: "Contenido de la tarjeta 1" },
    { id: 2, title: "Tarjeta 2", content: "Contenido de la tarjeta 2" },
    { id: 3, title: "Tarjeta 3", content: "Contenido de la tarjeta 3" },
  ]);

  const router = useRouter();

  const eliminarCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <ImageBackground source={require("../../assets/FondoApp.png")} style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {cards.map((card) => (
          <View key={card.id} style={styles.card}>
            <Text style={styles.title}>{card.title}</Text>
            <Text>{card.content}</Text>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => eliminarCard(card.id)}
          >
            <Text style={styles.deleteText}>X</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Button color="#6631D7" title="Agregar Medicamento" onPress={() => { router.push("../paciente/AgregarMedicamento"); }}>
        Agregar Medicamento
      </Button>
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: "#C9B1FF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    position: "relative",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  deleteBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#e74c3c",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
