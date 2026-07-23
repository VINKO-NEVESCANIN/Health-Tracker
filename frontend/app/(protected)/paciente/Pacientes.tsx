import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getUsers } from "@services/api";
import { theme, shadow } from "@constants/theme";

interface Patient {
  id: number;
  firstName: string | null;
  lastName: string | null;
  age: number | null;
  epilepsyType: string | null;
  email: string;
}

export default function Pacientes() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    getUsers({ role: "Paciente" })
      .then((data) => setPatients(Array.isArray(data) ? data : data?.patients ?? []))
      .catch(() => setError("No se pudieron cargar los pacientes."))
      .finally(() => setLoading(false));
  }, []);

  // Recarga la lista cada vez que vuelves a esta pantalla (p. ej. tras agregar un paciente)
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const filtered = patients.filter((p) =>
    `${p.firstName ?? ""} ${p.lastName ?? ""}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={theme.purple600} />
        </Pressable>
        <Text style={styles.title}>Pacientes</Text>
      </View>

      {/* Buscador */}
      <View style={[styles.searchWrapper, shadow]}>
        <Ionicons name="search" size={18} color={theme.gray400} style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar paciente..."
          placeholderTextColor={theme.gray400}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Agregar */}
      <Pressable
        style={[styles.addButton, shadow]}
        onPress={() => router.push("/(protected)/doctor/AgregarPaciente")}
      >
        <Ionicons name="add" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Agregar Nuevo Paciente</Text>
      </Pressable>

      {loading ? (
        <ActivityIndicator size="large" color={theme.purple600} style={{ marginTop: 24 }} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={<Text style={styles.empty}>Todavía no tienes pacientes registrados.</Text>}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.card, shadow]}
              onPress={() =>
                router.push({
                  pathname: "/(protected)/paciente/PerfilPaciente",
                  params: { id: String(item.id) },
                })
              }
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{(item.firstName ?? "?").charAt(0).toUpperCase()}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardName}>
                  {item.firstName} {item.lastName}
                </Text>
                {item.age != null && <Text style={styles.cardMeta}>{item.age} años</Text>}
                {item.epilepsyType && <Text style={styles.cardDiagnosis}>{item.epilepsyType}</Text>}
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
  title: { fontSize: 22, fontWeight: "bold", color: theme.gray800 },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  searchInput: { flex: 1, paddingVertical: 12, color: theme.gray800 },
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
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.purple500,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  cardName: { fontWeight: "600", color: theme.gray800, fontSize: 15 },
  cardMeta: { fontSize: 13, color: theme.gray500, marginTop: 2 },
  cardDiagnosis: { fontSize: 12, color: theme.purple600, marginTop: 2 },
  error: { color: theme.danger, textAlign: "center", marginTop: 24 },
  empty: { color: theme.gray500, textAlign: "center", marginTop: 24 },
});
