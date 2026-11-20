import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Pressable } from "react-native";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getPatientCrisis } from "@services/api";
import { useAuth } from "@context/auth";
import { theme, shadow } from "@constants/theme";

interface Crisis {
  id: number;
  crisisDate: string;
  duration: number | null;
  recuperation: number | null;
  unconscius: boolean | null;
}

export default function HistorialCrisis() {
  const router = useRouter();
  const { user } = useAuth();
  const { patientId: patientParam } = useLocalSearchParams<{ patientId?: string }>();
  const patientId = patientParam ? Number(patientParam) : user?.id;

  const [items, setItems] = useState<Crisis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      if (!patientId) return;
      setLoading(true);
      getPatientCrisis(patientId)
        .then((d) => {
          setItems(d);
          setError("");
        })
        .catch(() => setError("No se pudo cargar el historial."))
        .finally(() => setLoading(false));
    }, [patientId])
  );

  return (
    <View style={styles.screen}>
      <Pressable
        style={[styles.addButton, shadow]}
        onPress={() =>
          router.push({
            pathname: "/(protected)/paciente/RegistroCrisis",
            params: patientParam ? { patientId: patientParam } : {},
          })
        }
      >
        <Ionicons name="add" size={20} color="#fff" />
        <Text style={styles.addText}>Registrar crisis</Text>
      </Pressable>

      {loading ? (
        <ActivityIndicator size="large" color={theme.purple600} style={{ marginTop: 24 }} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(c) => String(c.id)}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={<Text style={styles.empty}>Todavía no hay crisis registradas.</Text>}
          renderItem={({ item }) => {
            const d = new Date(item.crisisDate);
            return (
              <View style={[styles.card, shadow]}>
                <View style={styles.dateBox}>
                  <Text style={styles.dateDay}>{d.getDate()}</Text>
                  <Text style={styles.dateMonth}>
                    {d.toLocaleDateString("es-MX", { month: "short" }).toUpperCase()}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>
                    {d.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}
                  </Text>
                  <Text style={styles.meta}>
                    Duración: {item.duration ?? "—"} min · Recuperación: {item.recuperation ?? "—"} min
                  </Text>
                  {item.unconscius ? <Text style={styles.badge}>Con pérdida de conciencia</Text> : null}
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
  addText: { color: "#fff", fontWeight: "bold" },
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
    backgroundColor: theme.pink50,
    alignItems: "center",
    justifyContent: "center",
  },
  dateDay: { fontSize: 20, fontWeight: "bold", color: theme.pink600 },
  dateMonth: { fontSize: 11, color: theme.pink500, fontWeight: "600" },
  title: { fontWeight: "600", color: theme.gray800 },
  meta: { fontSize: 13, color: theme.gray500, marginTop: 2 },
  badge: { fontSize: 12, color: theme.danger, fontWeight: "600", marginTop: 4 },
  error: { color: theme.danger, textAlign: "center", marginTop: 24 },
  empty: { color: theme.gray500, textAlign: "center", marginTop: 24 },
});
