import React, { useCallback, useState } from "react";
import { View, Text, Pressable, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getUsers, getPatientCrisis } from "@services/api";
import { theme, shadow } from "@constants/theme";

interface CrisisItem {
  id: number;
  crisisDate: string;
  duration: number | null;
  recuperation: number | null;
  unconscius: boolean;
  patientId: number;
  patientName: string;
}

export default function CrisisRecientes() {
  const router = useRouter();
  const [items, setItems] = useState<CrisisItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const patients = await getUsers({ role: "Paciente" });
      const all = await Promise.all(
        (patients as any[]).map(async (p) => {
          try {
            const crisis = await getPatientCrisis(p.id);
            return (crisis as any[]).map((c) => ({
              ...c,
              patientId: p.id,
              patientName: `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim() || p.email,
            }));
          } catch {
            return [];
          }
        })
      );
      const merged = all
        .flat()
        .sort((a, b) => new Date(b.crisisDate).getTime() - new Date(a.crisisDate).getTime())
        .slice(0, 30);
      setItems(merged);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={theme.purple600} />
        </Pressable>
        <Text style={styles.title}>Crisis Recientes</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={theme.purple600} style={{ marginTop: 24 }} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={<Text style={styles.empty}>No hay crisis registradas todavía.</Text>}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.card, shadow]}
              onPress={() =>
                router.push({
                  pathname: "/(protected)/paciente/PerfilPaciente",
                  params: { id: String(item.patientId) },
                })
              }
            >
              <View style={styles.cardIcon}>
                <Ionicons name="pulse" size={20} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardName}>{item.patientName}</Text>
                <Text style={styles.cardMeta}>
                  {new Date(item.crisisDate).toLocaleDateString("es-MX", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                  {item.duration != null ? ` · ${item.duration} min` : ""}
                  {item.unconscius ? " · pérdida de consciencia" : ""}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={theme.purple400} />
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.purple100, padding: 16, paddingTop: 48 },
  header: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 20 },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 20, fontWeight: "bold", color: theme.gray800 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: theme.indigo500,
    justifyContent: "center",
    alignItems: "center",
  },
  cardName: { fontWeight: "600", color: theme.gray800 },
  cardMeta: { fontSize: 12, color: theme.gray500, marginTop: 2 },
  empty: { color: theme.gray500, textAlign: "center", marginTop: 24 },
});
