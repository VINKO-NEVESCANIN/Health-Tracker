import React, { useCallback, useState } from "react";
import { View, Text, Pressable, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getAppointments, Appointment } from "@services/api";
import { theme, shadow } from "@constants/theme";

const fullName = (p?: { firstName: string | null; lastName: string | null } | null) =>
  p ? `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim() || "Paciente" : "Paciente";

export default function GestionarCitas() {
  const router = useRouter();
  const [items, setItems] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getAppointments()
        .then((d) => {
          setItems(d);
          setError("");
        })
        .catch(() => setError("No se pudieron cargar las citas."))
        .finally(() => setLoading(false));
    }, [])
  );

  return (
    <View style={styles.screen}>
      <Pressable
        style={[styles.addButton, shadow]}
        onPress={() => router.push("/(protected)/paciente/EditarCita")}
      >
        <Ionicons name="add" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Nueva cita</Text>
      </Pressable>

      {loading ? (
        <ActivityIndicator size="large" color={theme.purple600} style={{ marginTop: 24 }} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => String(i.id)}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={<Text style={styles.empty}>Todavía no tienes citas programadas.</Text>}
          renderItem={({ item }) => {
            const d = new Date(item.date);
            return (
              <Pressable
                style={[styles.card, shadow]}
                onPress={() =>
                  router.push({
                    pathname: "/(protected)/paciente/EditarCita",
                    params: { appointmentId: String(item.id) },
                  })
                }
              >
                <View style={styles.dateBox}>
                  <Text style={styles.dateDay}>{d.getDate()}</Text>
                  <Text style={styles.dateMonth}>
                    {d.toLocaleDateString("es-MX", { month: "short" }).toUpperCase()}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{fullName(item.patient)}</Text>
                  <View style={styles.row}>
                    <Ionicons name="time-outline" size={14} color={theme.gray500} />
                    <Text style={styles.meta}>{item.time || "Sin hora"}</Text>
                  </View>
                  {!!item.notes && (
                    <Text style={styles.notes} numberOfLines={1}>
                      {item.notes}
                    </Text>
                  )}
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.purple400} />
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.purple100, padding: 16 },
  addButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: theme.purple600,
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: 18,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
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
  notes: { fontSize: 12, color: theme.purple600, marginTop: 2 },
  error: { color: theme.danger, textAlign: "center", marginTop: 24 },
  empty: { color: theme.gray500, textAlign: "center", marginTop: 24 },
});
