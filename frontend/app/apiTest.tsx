import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";

export default function ApiTest() {
  const [events, setEvents] = useState<any[]>([]);

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://192.168.100.35:4000/api/events"); 
      // ⚠️ Android Emulator usa 10.0.2.2 en vez de localhost
      // En físico, usa la IP de tu PC (ej: http://192.168.50.125:4000)
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("❌ Error cargando eventos:", err);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Cargar eventos" onPress={fetchEvents} />
      {events.map((ev) => (
        <Text key={ev.id}>
          {ev.description} (Paciente: {ev.user?.name})
        </Text>
      ))}
    </View>
  );
}
