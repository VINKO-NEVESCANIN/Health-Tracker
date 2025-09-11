import { useEffect, useState } from "react";
import { View, Text, Button, TextInput, FlatList } from "react-native";

export default function HomeScreen() {
  const [events, setEvents] = useState<any[]>([]);
  const [description, setDescription] = useState("");

  // Cargar eventos
  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:4000/events");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Error cargando eventos", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Registrar evento y refrescar lista
  const addEvent = async () => {
    if (!description.trim()) return;
    await fetch("http://localhost:4000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });
    setDescription(""); // limpia input
    fetchEvents(); // refresca la lista
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>📌 Línea de tiempo de los ataques</Text>

      <TextInput
        placeholder="Describe el evento"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
      />
      <Button title="Registrar Evento" onPress={addEvent} />

      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: "bold" }}>{item.description}</Text>
            <Text>{new Date(item.timestamp).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}
