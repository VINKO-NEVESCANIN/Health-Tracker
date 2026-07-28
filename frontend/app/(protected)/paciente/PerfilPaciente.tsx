import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getUserById } from "@services/api";
import { theme, gradients, shadow } from "@constants/theme";

interface PatientDetail {
  id: number;
  firstName: string | null;
  lastName: string | null;
  age: number | null;
  email: string;
  gender: string | null;
  epilepsyType: string | null;
  crisis: { id: number; crisisDate: string; duration: number | null; recuperation: number | null }[];
  medications: { id: number }[];
}

export default function PerfilPaciente() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [patient, setPatient] = useState<PatientDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    if (!id) return;
    setLoading(true);
    getUserById(Number(id))
      .then(setPatient)
      .finally(() => setLoading(false));
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  if (loading || !patient) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color={theme.purple600} />
      </View>
    );
  }

  const initial = (patient.firstName ?? "?").charAt(0).toUpperCase();
  const ultimaCrisis = patient.crisis?.[0];

  const quickActions = [
    { icon: "analytics" as const, label: "Timeline", color: theme.purple500, onPress: () => router.push({ pathname: "/(protected)/doctor/EpileptoGrama", params: { patientId: String(patient.id) } }) },
    {
      icon: "heart" as const,
      label: "Crisis",
      color: theme.pink500,
      onPress: () =>
        router.push({ pathname: "/(protected)/paciente/RegistroCrisis", params: { patientId: String(patient.id) } }),
    },
    { icon: "medical" as const, label: "Medicamentos", color: theme.indigo500, onPress: () => router.push({ pathname: "/(protected)/doctor/medicamentos", params: { patientId: String(patient.id) } }) },
    { icon: "calendar" as const, label: "Citas", color: theme.blue500, onPress: () => router.push("/(protected)/doctor/GestionarCitas") },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable style={styles.iconButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={theme.purple600} />
        </Pressable>
        <Pressable
          style={styles.iconButton}
          onPress={() =>
            router.push({ pathname: "/(protected)/paciente/EditarPaciente", params: { id: String(patient.id) } })
          }
        >
          <Ionicons name="pencil" size={18} color={theme.purple600} />
        </Pressable>
      </View>

      {/* Perfil */}
      <View style={[styles.card, shadow]}>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <View>
            <Text style={styles.name}>
              {patient.firstName} {patient.lastName}
            </Text>
            {patient.age != null && <Text style={styles.meta}>{patient.age} años</Text>}
          </View>
        </View>

        <InfoRow icon="mail" text={patient.email} />
        {patient.gender && <InfoRow icon="person" text={patient.gender} />}
        {patient.epilepsyType && <InfoRow icon="document-text" label="Diagnóstico" text={patient.epilepsyType} />}
      </View>

      {/* Accesos rápidos */}
      <View style={styles.grid}>
        {quickActions.map((item) => (
          <Pressable key={item.label} style={[styles.actionCard, shadow]} onPress={item.onPress}>
            <View style={[styles.actionIcon, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon} size={22} color="#fff" />
            </View>
            <Text style={styles.actionLabel}>{item.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* Actividad reciente */}
      <View style={[styles.card, shadow]}>
        <Text style={styles.sectionTitle}>Actividad reciente</Text>
        <StatRow icon="pulse" bg={theme.purple50} color={theme.purple600} label="Crisis registradas" value={patient.crisis?.length ?? 0} />
        <StatRow icon="medical" bg={theme.pink50} color={theme.pink600} label="Medicamentos" value={patient.medications?.length ?? 0} />
      </View>

      {/* Última crisis */}
      {ultimaCrisis && (
        <LinearGradient colors={gradients.header} style={[styles.card, { marginBottom: 24 }]}>
          <View style={styles.lastCrisisHeader}>
            <Ionicons name="trending-up" size={20} color="#fff" />
            <Text style={styles.lastCrisisTitle}>Última crisis</Text>
          </View>
          <View style={styles.lastCrisisRow}>
            <View>
              <Text style={styles.lastCrisisLabel}>Duración</Text>
              <Text style={styles.lastCrisisValue}>{ultimaCrisis.duration ?? "—"} min</Text>
            </View>
            <View>
              <Text style={styles.lastCrisisLabel}>Recuperación</Text>
              <Text style={styles.lastCrisisValue}>{ultimaCrisis.recuperation ?? "—"} min</Text>
            </View>
          </View>
        </LinearGradient>
      )}
    </ScrollView>
  );
}

function InfoRow({ icon, label, text }: { icon: keyof typeof Ionicons.glyphMap; label?: string; text: string }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={14} color={theme.purple600} />
      </View>
      <View>
        {label && <Text style={styles.infoLabel}>{label}</Text>}
        <Text style={styles.infoText}>{text}</Text>
      </View>
    </View>
  );
}

function StatRow({
  icon,
  bg,
  color,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  bg: string;
  color: string;
  label: string;
  value: number;
}) {
  return (
    <View style={styles.statRow}>
      <View style={styles.statLeft}>
        <View style={[styles.statIcon, { backgroundColor: bg }]}>
          <Ionicons name={icon} size={18} color={color} />
        </View>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.purple100 },
  loadingScreen: { flex: 1, backgroundColor: theme.purple100, justifyContent: "center", alignItems: "center" },
  content: { padding: 16, paddingTop: 48, paddingBottom: 24 },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  card: { backgroundColor: "#fff", borderRadius: 20, padding: 20, marginBottom: 20 },
  profileRow: { flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 20 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.purple500,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#fff", fontSize: 26, fontWeight: "bold" },
  name: { fontSize: 20, fontWeight: "bold", color: theme.gray800 },
  meta: { color: theme.gray500, marginTop: 2 },
  infoRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 10 },
  infoIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.purple100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
  },
  infoLabel: { fontSize: 12, fontWeight: "600", color: theme.gray700 },
  infoText: { fontSize: 13, color: theme.gray700 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 4 },
  actionCard: { width: "48%", backgroundColor: "#fff", borderRadius: 18, padding: 16, marginBottom: 14 },
  actionIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: "center", alignItems: "center", marginBottom: 10 },
  actionLabel: { fontWeight: "600", color: theme.gray800, fontSize: 13 },
  sectionTitle: { fontWeight: "bold", color: theme.gray800, marginBottom: 14, fontSize: 16 },
  statRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  statLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  statIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: "center", alignItems: "center" },
  statLabel: { color: theme.gray700 },
  statValue: { fontWeight: "bold", fontSize: 16 },
  lastCrisisHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  lastCrisisTitle: { color: "#fff", fontWeight: "bold" },
  lastCrisisRow: { flexDirection: "row", justifyContent: "space-between" },
  lastCrisisLabel: { color: "rgba(255,255,255,0.8)", fontSize: 12, marginBottom: 4 },
  lastCrisisValue: { color: "#fff", fontSize: 22, fontWeight: "bold" },
});
