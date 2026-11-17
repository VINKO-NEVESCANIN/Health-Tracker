import React, { useCallback, useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getUserById, getPatientCrisis, getPatientMedications } from "@services/api";
import { useAuth } from "@context/auth";
import { theme, shadow } from "@constants/theme";

interface CrisisEntry {
  id: number;
  crisisDate: string;
  duration: number | null;
  recuperation: number | null;
  unconscius: boolean;
}
interface MedEntry {
  id: number;
  dose: string | null;
  interval: string | null;
  startDate: string | null;
  medication: { name: string };
}

export default function EpileptoGrama() {
  const { patientId: patientIdParam } = useLocalSearchParams<{ patientId?: string }>();
  const { user } = useAuth();
  const patientId = patientIdParam
    ? Number(patientIdParam)
    : user?.role?.toLowerCase() === "paciente"
    ? user.id
    : undefined;
  const router = useRouter();

  const [patientName, setPatientName] = useState("");
  const [crisis, setCrisis] = useState<CrisisEntry[]>([]);
  const [meds, setMeds] = useState<MedEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!patientId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [patient, crisisData, medsData] = await Promise.all([
        getUserById(patientId),
        getPatientCrisis(patientId),
        getPatientMedications(patientId),
      ]);
      setPatientName(`${patient.firstName ?? ""} ${patient.lastName ?? ""}`.trim() || patient.email);
      setCrisis((crisisData as CrisisEntry[]).sort((a, b) => new Date(b.crisisDate).getTime() - new Date(a.crisisDate).getTime()));
      setMeds(medsData as MedEntry[]);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  if (!patientId) {
    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color={theme.purple600} />
          </Pressable>
          <Text style={styles.title}>Timeline</Text>
        </View>
        <Text style={styles.warning}>Entra desde el perfil de un paciente para ver su timeline.</Text>
        <Pressable style={styles.linkButton} onPress={() => router.push("/(protected)/paciente/Pacientes")}>
          <Text style={styles.linkButtonText}>Ir a Pacientes</Text>
        </Pressable>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={[styles.screen, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={theme.purple600} />
      </View>
    );
  }

  // Tendencia: comparamos la duración promedio de las últimas 3 crisis contra el promedio general.
  const avgAll = crisis.length ? crisis.reduce((acc, c) => acc + (c.duration ?? 0), 0) / crisis.length : 0;
  const recent = crisis.slice(0, 3);
  const avgRecent = recent.length ? recent.reduce((acc, c) => acc + (c.duration ?? 0), 0) / recent.length : 0;
  const mejorando = crisis.length >= 2 && avgRecent <= avgAll;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={theme.purple600} />
        </Pressable>
        <View>
          <Text style={styles.title}>Timeline</Text>
          <Text style={styles.subtitle}>{patientName}</Text>
        </View>
      </View>

      {crisis.length > 0 && (
        <LinearGradient
          colors={mejorando ? ["#22c55e", "#16a34a"] : ["#f97316", "#ea580c"]}
          style={[styles.card, { marginBottom: 20 }]}
        >
          <View style={styles.trendRow}>
            <View style={styles.trendLeft}>
              <Ionicons name={mejorando ? "trending-down" : "trending-up"} size={28} color="#fff" />
              <View>
                <Text style={styles.trendLabel}>Tendencia</Text>
                <Text style={styles.trendValue}>{mejorando ? "Mejorando" : "Requiere atención"}</Text>
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.trendLabel}>Duración promedio</Text>
              <Text style={styles.trendBig}>{avgRecent.toFixed(1)}m</Text>
            </View>
          </View>
        </LinearGradient>
      )}

      {/* Medicamentos */}
      <View style={[styles.card, shadow, { marginBottom: 20 }]}>
        <View style={styles.sectionHeader}>
          <Ionicons name="medical" size={18} color={theme.purple600} />
          <Text style={styles.sectionTitle}>Medicamentos</Text>
        </View>
        {meds.length === 0 ? (
          <Text style={styles.empty}>Sin medicamentos registrados.</Text>
        ) : (
          meds.map((m) => (
            <View key={m.id} style={styles.medRow}>
              <View style={styles.dot} />
              <View style={{ flex: 1 }}>
                <Text style={styles.medName}>{m.medication.name}</Text>
                <Text style={styles.medMeta}>{[m.dose, m.interval].filter(Boolean).join(" · ") || "Sin dosis registrada"}</Text>
                {m.startDate && (
                  <Text style={styles.medDate}>
                    Inicio: {new Date(m.startDate).toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" })}
                  </Text>
                )}
              </View>
            </View>
          ))
        )}
      </View>

      {/* Historial de crisis */}
      <View style={[styles.card, shadow, { marginBottom: 20 }]}>
        <View style={styles.sectionHeader}>
          <Ionicons name="pulse" size={18} color={theme.purple600} />
          <Text style={styles.sectionTitle}>Historial de Crisis</Text>
        </View>
        {crisis.length === 0 ? (
          <Text style={styles.empty}>Sin crisis registradas.</Text>
        ) : (
          crisis.map((c) => (
            <View key={c.id} style={styles.crisisRow}>
              <View style={styles.crisisRowTop}>
                <Text style={styles.crisisDate}>
                  {new Date(c.crisisDate).toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" })}
                </Text>
                {c.unconscius && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>Pérdida de consciencia</Text>
                  </View>
                )}
              </View>
              <Text style={styles.crisisMeta}>
                ⏱️ {c.duration ?? "—"} min de duración · 💤 {c.recuperation ?? "—"} min de recuperación
              </Text>
            </View>
          ))
        )}
      </View>

      <Pressable
        style={styles.addButton}
        onPress={() =>
          router.push({ pathname: "/(protected)/paciente/RegistroCrisis", params: { patientId: String(patientId) } })
        }
      >
        <Text style={styles.addButtonText}>+ Registrar Nueva Crisis</Text>
      </Pressable>
    </ScrollView>
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
  subtitle: { fontSize: 13, color: theme.gray500 },
  warning: { color: theme.gray500, textAlign: "center", marginTop: 24, marginBottom: 16 },
  linkButton: { backgroundColor: theme.purple600, borderRadius: 12, paddingVertical: 12, alignItems: "center" },
  linkButtonText: { color: "#fff", fontWeight: "bold" },
  card: { backgroundColor: "#fff", borderRadius: 20, padding: 18 },
  trendRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  trendLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  trendLabel: { color: "rgba(255,255,255,0.85)", fontSize: 12 },
  trendValue: { color: "#fff", fontSize: 17, fontWeight: "bold" },
  trendBig: { color: "#fff", fontSize: 26, fontWeight: "bold" },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 },
  sectionTitle: { fontWeight: "bold", color: theme.gray800, fontSize: 15 },
  empty: { color: theme.gray500, fontSize: 13 },
  medRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, backgroundColor: theme.purple50, borderRadius: 12, padding: 12, marginBottom: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: theme.purple600, marginTop: 5 },
  medName: { fontWeight: "600", color: theme.gray800 },
  medMeta: { fontSize: 12, color: theme.gray500, marginTop: 2 },
  medDate: { fontSize: 11, color: theme.gray400, marginTop: 2 },
  crisisRow: { backgroundColor: theme.gray50, borderRadius: 12, padding: 12, marginBottom: 10 },
  crisisRowTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  crisisDate: { fontWeight: "600", color: theme.gray800, fontSize: 13 },
  badge: { backgroundColor: "#fee2e2", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { color: "#b91c1c", fontSize: 10, fontWeight: "600" },
  crisisMeta: { fontSize: 12, color: theme.gray500 },
  addButton: { backgroundColor: theme.purple600, borderRadius: 14, paddingVertical: 16, alignItems: "center" },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});
