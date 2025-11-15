import { useEffect, useState } from "react";
import { View, ScrollView, RefreshControl, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { getPatients } from "../../_app.api";
import { Card } from "../../components/Card";
import { theme } from "../../styles/theme";

export default function PacientesList() {
  const [patients, setPatients] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  async function loadData() {
    setRefreshing(true);
    const data = await getPatients();
    setPatients(data);
    setRefreshing(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background, flex: 1, padding: 16 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={loadData} />
      }
    >
      <Button title="➕ Añadir paciente" color={theme.colors.primary} onPress={() => router.push("/(tabs)/pacientes/add")} />
      {patients.map((p) => (
        <Card key={p.id} title={p.name} subtitle={`Edad: ${p.age} años`} />
      ))}
      {patients.length === 0 && (
        <Text style={{ color: "#999", textAlign: "center", marginTop: 20 }}>
          No hay pacientes registrados
        </Text>
      )}
    </ScrollView>
  );
}
