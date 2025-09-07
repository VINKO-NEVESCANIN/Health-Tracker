import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";

export default function App() {
  const [orders, setOrders] = useState<any[]>([]);

  // Cargar pedidos desde backend
  useEffect(() => {
    fetch("http://192.168.1.100:4000/api/orders") // 👈 cambia localhost por tu IP local si pruebas en celular
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  // Crear un pedido de prueba
  const addOrder = () => {
    fetch("http://192.168.1.100:4000/api/orders", { // igual aquí
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Date.now(), description: "Nuevo pedido" }),
    })
      .then((res) => res.json())
      .then((newOrder) => setOrders([...orders, newOrder]))
      .catch((err) => console.error(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos:</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>📦 {item.description}</Text>
        )}
      />
      <Button title="Agregar pedido" onPress={addOrder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  item: { fontSize: 16, marginVertical: 5 },
});
