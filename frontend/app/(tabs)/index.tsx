import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, TextInput, Image } from "react-native";


export default function IndexScreen() {
  const [events, setEvents] = useState<any[]>([]);
  const [newEvent, setNewEvent] = useState("");

  // Cargar eventos desde backend
  useEffect(() => {
    fetch("http://localhost:4000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error cargando eventos:", err));
  }, []);

  // Crear un evento nuevo
  const addEvent = () => {
    if (!newEvent.trim()) return;
    fetch("http://localhost:4000/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: newEvent }),
    })
      .then((res) => res.json())
      .then((event) => {
        setEvents([...events, event]);
        setNewEvent("");
      })
      .catch((err) => console.error("Error agregando evento:", err));
  };

  return (
    
    <View style={styles.container}>
      <Image source={require("C:/Users/jotha/OneDrive/Documents/Health-Tracker/frontend/app/Icon/LoginIcon.png")} style={styles.LogIcon} />
      <Text style={styles.title}>Neuromedy</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={newEvent}
        onChangeText={setNewEvent}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={newEvent}
        onChangeText={setNewEvent}
        />

      <Button title="Iniciar Sesion" onPress={addEvent} />

      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>🕒 {new Date(item.date).toLocaleString()}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemText: { fontWeight: "bold" },

 LogIcon: {flex: 1, padding: 20, marginTop: 50,
  width: 100, height: 100, marginBottom: 20, alignItems: "center"}
});
