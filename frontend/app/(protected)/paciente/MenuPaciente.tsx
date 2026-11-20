import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Href } from "expo-router";
import { useAuth } from "@context/auth";
import { theme, gradients, shadow } from "@constants/theme";

type MenuItem = { id: number; title: string; icon: keyof typeof Ionicons.glyphMap; color: string; ruta: Href };

export default function MenuPaciente() {
  const router = useRouter();
  const { user } = useAuth();
  const displayName = user?.firstName ?? "Paciente";
  const initial = displayName.charAt(0).toUpperCase();

  const items: MenuItem[] = [
    { id: 1, title: "Mis Citas", icon: "calendar", color: theme.pink500, ruta: "/(protected)/paciente/MisCitas" },
    { id: 2, title: "Registrar Crisis", icon: "add-circle", color: theme.purple500, ruta: "/(protected)/paciente/RegistroCrisis" },
    { id: 3, title: "Epileptograma", icon: "document-text", color: theme.blue500, ruta: "/(protected)/doctor/EpileptoGrama" },
    { id: 4, title: "Mis Crisis", icon: "pulse", color: theme.indigo500, ruta: "/(protected)/paciente/HistorialCrisis" },
    { id: 5, title: "Medicamentos", icon: "medkit", color: theme.pink600, ruta: "/(protected)/doctor/medicamentos" },
    { id: 6, title: "Estudios", icon: "flask", color: theme.indigo600, ruta: "/(protected)/paciente/EstudiosPrevios" },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <LinearGradient colors={gradients.header} style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <Pressable style={styles.iconButton} onPress={() => router.push("/(protected)/config")}>
            <Ionicons name="settings-outline" size={20} color="#fff" />
          </Pressable>
        </View>
        <Text style={styles.headerName}>Hola, {displayName}</Text>
        <Text style={styles.headerRole}>Tu seguimiento de epilepsia</Text>
      </LinearGradient>

      <View style={styles.grid}>
        {items.map((item) => (
          <Pressable key={item.id} style={[styles.card, shadow]} onPress={() => router.push(item.ruta)}>
            <View style={[styles.cardIcon, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon} size={26} color="#fff" />
            </View>
            <Text style={styles.cardLabel}>{item.title}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={[styles.sos, shadow]}
        onPress={() => router.push("/(protected)/paciente/RegistroCrisis")}
      >
        <Ionicons name="alert-circle" size={22} color="#fff" />
        <Text style={styles.sosText}>Registrar una crisis ahora</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.purple100 },
  content: { padding: 16, paddingTop: 48, paddingBottom: 40 },
  header: { borderRadius: 28, padding: 24, marginBottom: 20 },
  headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderWidth: 3,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerName: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  headerRole: { color: "rgba(255,255,255,0.85)", marginTop: 2 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 8 },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  cardIcon: { width: 52, height: 52, borderRadius: 16, justifyContent: "center", alignItems: "center", marginBottom: 14 },
  cardLabel: { fontWeight: "600", color: theme.gray800, fontSize: 15 },
  sos: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: theme.pink600,
    borderRadius: 16,
    paddingVertical: 16,
  },
  sosText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});
