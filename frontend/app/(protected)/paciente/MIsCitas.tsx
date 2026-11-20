import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getMyAppointments, Appointment } from "@services/api";
import { theme, shadow } from "@constants/theme";

export default function MisCitas() {
  const [items, setItems] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getMyAppointments()
        .then((d) => {
          setItems(d);
          setError("");
        })
        .catch(() => setError("No se pudieron cargar tus citas."))
        .finally(() => setLoading(false));
    }, [])
  );

  if (loading) return <ActivityIndicator size="large" color={theme.purple600} style={{ marginTop: 48 }} />;

  return (
    <View style={styles.screen}>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => String(i.id)}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={<Text style={styles.empty}>Todavía no tienes citas programadas.</Text>}
          renderItem={({ item }) => {
            const d = new Date(item.date);
            const doc = item.doctor ? `Dr. ${item.doctor.firstName ?? ""} ${item.doctor.lastName ?? ""}`.trim() : "Doctor";
            return (
              <View style={[styles.card, shadow]}>
                <View style={styles.dateBox}>
                  <Text style={styles.dateDay}>{d.getDate()}</Text>
                  <Text style={styles.dateMonth}>
                    {d.toLocaleDateString("es-MX", { month: "short" }).toUpperCase()}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{doc}</Text>
                  <View style={styles.row}>
                    <Ionicons name="time-outline" size={14} color={theme.gray500} />
                    <Text style={styles.meta}>{item.time || "Sin hora"}</Text>
                  </View>
                  {!!item.notes && <Text style={styles.notes}>{item.notes}</Text>}
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.purple100, padding: 16 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
  },
  dateBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: theme.purple50,
    alignItems: "center",
    justifyContent: "center",
  },
  dateDay: { fontSize: 20, fontWeight: "bold", color: theme.purple600 },
  dateMonth: { fontSize: 11, color: theme.purple500, fontWeight: "600" },
  name: { fontWeight: "600", color: theme.gray800, fontSize: 15 },
  row: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  meta: { fontSize: 13, color: theme.gray500 },
  notes: { fontSize: 12, color: theme.purple600, marginTop: 4 },
  error: { color: theme.danger, textAlign: "center", marginTop: 24 },
  empty: { color: theme.gray500, textAlign: "center", marginTop: 24 },
});
