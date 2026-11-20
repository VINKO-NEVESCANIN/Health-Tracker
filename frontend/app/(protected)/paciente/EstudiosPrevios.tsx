import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getPatientStudies, createStudy, updateStudy } from "@services/api";
import { useAuth } from "@context/auth";
import { theme, shadow } from "@constants/theme";

type Key = "EEG" | "RMNC" | "NSMAP";
const TYPES: { key: Key; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: "NSMAP", label: "Niveles séricos", icon: "flask" },
  { key: "RMNC", label: "RMN de cráneo", icon: "scan" },
  { key: "EEG", label: "Electroencefalograma", icon: "pulse" },
];
const RESULTS = ["No Realizado", "Normal", "Anormal"];

// El paciente captura/consulta sus propios estudios previos (un registro por paciente)
export default function EstudiosPrevios() {
  const router = useRouter();
  const { user } = useAuth();
  const [studyId, setStudyId] = useState<number | null>(null);
  const [res, setRes] = useState<Record<Key, string>>({ EEG: "No Realizado", RMNC: "No Realizado", NSMAP: "No Realizado" });
  const [dates, setDates] = useState<Record<Key, Date>>({ EEG: new Date(), RMNC: new Date(), NSMAP: new Date() });
  const [picker, setPicker] = useState<Key | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    getPatientStudies(user.id)
      .then((list) => {
        const s = list[0];
        if (!s) return;
        setStudyId(s.id);
        setRes({ EEG: s.resEEG ?? "No Realizado", RMNC: s.resRMNC ?? "No Realizado", NSMAP: s.resNSMAP ?? "No Realizado" });
        setDates({
          EEG: s.dateEEG ? new Date(s.dateEEG) : new Date(),
          RMNC: s.dateRMNC ? new Date(s.dateRMNC) : new Date(),
          NSMAP: s.dateNSMAP ? new Date(s.dateNSMAP) : new Date(),
        });
      })
      .catch(() => Alert.alert("Error", "No se pudieron cargar tus estudios."))
      .finally(() => setLoading(false));
  }, [user]);

  const guardar = async () => {
    if (!user) return;
    setSaving(true);
    const body = {
      dateEEG: dates.EEG.toISOString(),
      dateRMNC: dates.RMNC.toISOString(),
      dateNSMAP: dates.NSMAP.toISOString(),
      resEEG: res.EEG,
      resRMNC: res.RMNC,
      resNSMAP: res.NSMAP,
    };
    try {
      if (studyId) await updateStudy(studyId, body);
      else await createStudy({ patientId: user.id, ...body });
      router.back();
    } catch {
      Alert.alert("Error", "No se pudieron guardar los estudios.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color={theme.purple600} style={{ marginTop: 48 }} />;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {TYPES.map((t) => (
        <View key={t.key} style={[styles.block, shadow]}>
          <View style={styles.blockHeader}>
            <Ionicons name={t.icon} size={18} color={theme.purple500} />
            <Text style={styles.blockTitle}>{t.label}</Text>
          </View>
          <View style={styles.chips}>
            {RESULTS.map((r) => {
              const active = res[t.key] === r;
              return (
                <Pressable key={r} style={[styles.chip, active && styles.chipActive]} onPress={() => setRes({ ...res, [t.key]: r })}>
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{r}</Text>
                </Pressable>
              );
            })}
          </View>
          <Pressable style={styles.dateField} onPress={() => setPicker(t.key)}>
            <Ionicons name="calendar-outline" size={16} color={theme.purple600} />
            <Text style={styles.dateText}>{dates[t.key].toLocaleDateString("es-MX")}</Text>
          </Pressable>
        </View>
      ))}

      <Pressable style={[styles.primary, shadow, saving && { opacity: 0.6 }]} onPress={guardar} disabled={saving}>
        <Text style={styles.primaryText}>{saving ? "Guardando..." : "Guardar"}</Text>
      </Pressable>

      <DateTimePickerModal
        isVisible={!!picker}
        mode="date"
        date={picker ? dates[picker] : new Date()}
        maximumDate={new Date()}
        onConfirm={(d) => {
          if (picker) setDates({ ...dates, [picker]: d });
          setPicker(null);
        }}
        onCancel={() => setPicker(null)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.purple100 },
  content: { padding: 16, paddingBottom: 40 },
  block: { backgroundColor: "#fff", borderRadius: 18, padding: 16, marginBottom: 14, gap: 12 },
  blockHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  blockTitle: { fontWeight: "700", color: theme.gray800, fontSize: 15 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { backgroundColor: theme.purple50, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 14, borderWidth: 1, borderColor: theme.purple200 },
  chipActive: { backgroundColor: theme.purple600, borderColor: theme.purple600 },
  chipText: { color: theme.gray700 },
  chipTextActive: { color: "#fff", fontWeight: "600" },
  dateField: { flexDirection: "row", alignItems: "center", gap: 8 },
  dateText: { color: theme.gray700 },
  primary: { backgroundColor: theme.purple600, borderRadius: 14, paddingVertical: 15, alignItems: "center", marginTop: 10 },
  primaryText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});
