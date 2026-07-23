import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Href } from "expo-router";
import { useAuth } from "@context/auth";
import { theme, gradients, shadow } from "@constants/theme";

type MenuItem = {
  id: number;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  ruta: Href;
};

const menuItems: MenuItem[] = [
  { id: 1, title: "Pacientes", icon: "people", color: theme.purple500, ruta: "/paciente/Pacientes" },
  { id: 2, title: "Mis Citas", icon: "calendar", color: theme.pink500, ruta: "/doctor/GestionarCitas" },
  { id: 3, title: "Crisis Recientes", icon: "pulse", color: theme.indigo500, ruta: "/doctor/CrisisRecientes" },
  { id: 4, title: "Epileptograma", icon: "document-text", color: theme.blue500, ruta: "/doctor/EpileptoGrama" },
];

export default function MenuDoctor() {
  const router = useRouter();
  const { user } = useAuth();
  const displayName = user?.firstName ?? "Doctor";
  const initial = displayName.charAt(0).toUpperCase();

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
        <Text style={styles.headerName}>Dr. {displayName}</Text>
        <Text style={styles.headerRole}>{user?.role ?? "Doctor"}</Text>
      </LinearGradient>

      <View style={styles.grid}>
        {menuItems.map((item) => (
          <Pressable key={item.id} style={[styles.card, shadow]} onPress={() => router.push(item.ruta)}>
            <View style={[styles.cardIcon, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon} size={26} color="#fff" />
            </View>
            <Text style={styles.cardLabel}>{item.title}</Text>
          </Pressable>
        ))}
      </View>

      <View style={[styles.summaryCard, shadow]}>
        <Text style={styles.summaryTitle}>Resumen de hoy</Text>
        <SummaryRow icon="calendar" color={theme.purple600} bg={theme.purple50} label="Citas programadas" value="—" />
        <SummaryRow icon="people" color={theme.pink600} bg={theme.pink50} label="Pacientes activos" value="—" />
        <SummaryRow icon="pulse" color={theme.indigo600} bg={theme.indigo50} label="Crisis registradas" value="—" />
        <Text style={styles.summaryNote}>Estos datos aún no vienen del backend (falta un endpoint de resumen).</Text>
      </View>
    </ScrollView>
  );
}

function SummaryRow({
  icon,
  color,
  bg,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bg: string;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.summaryRow}>
      <View style={styles.summaryLeft}>
        <View style={[styles.summaryIcon, { backgroundColor: bg }]}>
          <Ionicons name={icon} size={18} color={color} />
        </View>
        <Text style={styles.summaryLabel}>{label}</Text>
      </View>
      <Text style={[styles.summaryValue, { color }]}>{value}</Text>
    </View>
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
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 20 },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
  },
  cardIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  cardLabel: { fontWeight: "600", color: theme.gray800 },
  summaryCard: { backgroundColor: "#fff", borderRadius: 20, padding: 20 },
  summaryTitle: { fontWeight: "bold", color: theme.gray800, marginBottom: 14, fontSize: 16 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  summaryLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  summaryIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: "center", alignItems: "center" },
  summaryLabel: { color: theme.gray700 },
  summaryValue: { fontWeight: "bold" },
  summaryNote: { fontSize: 11, color: theme.gray400, marginTop: 6, fontStyle: "italic" },
});
