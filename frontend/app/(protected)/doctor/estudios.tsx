import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getAllStudies, getUsers, createStudy, updateStudy, Study } from "@services/api";
import { theme, shadow } from "@constants/theme";

type Key = "EEG" | "RMNC" | "NSMAP";
const TYPES: { key: Key; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: "EEG", label: "Electroencefalograma", icon: "pulse" },
  { key: "RMNC", label: "RMN de cráneo", icon: "scan" },
  { key: "NSMAP", label: "Niveles séricos", icon: "flask" },
];
const RESULTS = ["No Realizado", "Normal", "Anormal"];

const resultColor = (r: string | null) =>
  r === "Normal" ? "#16a34a" : r === "Anormal" ? theme.danger : theme.gray500;
const fmt = (d: string | null) => (d ? new Date(d).toLocaleDateString("es-MX") : "—");
const name = (p?: { firstName: string | null; lastName: string | null }) =>
  p ? `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim() || "Paciente" : "Paciente";

type Draft = {
  id?: number;
  patientId: number | null;
  dates: Record<Key, Date>;
  res: Record<Key, string>;
};

const emptyDraft = (): Draft => ({
  patientId: null,
  dates: { EEG: new Date(), RMNC: new Date(), NSMAP: new Date() },
  res: { EEG: "No Realizado", RMNC: "No Realizado", NSMAP: "No Realizado" },
});

export default function Estudios() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [patients, setPatients] = useState<{ id: number; firstName: string | null; lastName: string | null }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [pickerFor, setPickerFor] = useState<Key | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    Promise.all([getAllStudies(), getUsers({ role: "Paciente" })])
      .then(([s, p]) => {
        setStudies(s);
        setPatients(Array.isArray(p) ? p : []);
        setError("");
      })
      .catch(() => setError("No se pudieron cargar los estudios."))
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(load);

  const openEdit = (s: Study) =>
    setDraft({
      id: s.id,
      patientId: s.patientId,
      dates: {
        EEG: s.dateEEG ? new Date(s.dateEEG) : new Date(),
        RMNC: s.dateRMNC ? new Date(s.dateRMNC) : new Date(),
        NSMAP: s.dateNSMAP ? new Date(s.dateNSMAP) : new Date(),
      },
      res: {
        EEG: s.resEEG ?? "No Realizado",
        RMNC: s.resRMNC ?? "No Realizado",
        NSMAP: s.resNSMAP ?? "No Realizado",
      },
    });

  const save = async () => {
    if (!draft?.patientId) {
      Alert.alert("Falta el paciente", "Selecciona un paciente.");
      return;
    }
    setSaving(true);
    const body = {
      dateEEG: draft.dates.EEG.toISOString(),
      dateRMNC: draft.dates.RMNC.toISOString(),
      dateNSMAP: draft.dates.NSMAP.toISOString(),
      resEEG: draft.res.EEG,
      resRMNC: draft.res.RMNC,
      resNSMAP: draft.res.NSMAP,
    };
    try {
      if (draft.id) await updateStudy(draft.id, body);
      else await createStudy({ patientId: draft.patientId, ...body });
      setDraft(null);
      load();
    } catch {
      Alert.alert("Error", "No se pudo guardar el estudio.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.screen}>
      <Pressable style={[styles.addButton, shadow]} onPress={() => setDraft(emptyDraft())}>
        <Ionicons name="add" size={20} color="#fff" />
        <Text style={styles.addText}>Nuevo estudio</Text>
      </Pressable>

      {loading ? (
        <ActivityIndicator size="large" color={theme.purple600} style={{ marginTop: 24 }} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={studies}
          keyExtractor={(s) => String(s.id)}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={<Text style={styles.empty}>Todavía no hay estudios registrados.</Text>}
          renderItem={({ item }) => (
            <Pressable style={[styles.card, shadow]} onPress={() => openEdit(item)}>
              <Text style={styles.patient}>{name(item.patient)}</Text>
              {TYPES.map((t) => {
                const res = item[`res${t.key}` as keyof Study] as string | null;
                const date = item[`date${t.key}` as keyof Study] as string | null;
                return (
                  <View key={t.key} style={styles.row}>
                    <Ionicons name={t.icon} size={16} color={theme.purple500} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.rowLabel}>{t.label}</Text>
                      <Text style={styles.rowDate}>{fmt(date)}</Text>
                    </View>
                    <Text style={[styles.badge, { color: resultColor(res), borderColor: resultColor(res) }]}>
                      {res ?? "No Realizado"}
                    </Text>
                  </View>
                );
              })}
            </Pressable>
          )}
        />
      )}

      <Modal visible={!!draft} animationType="slide" onRequestClose={() => setDraft(null)}>
        {draft && (
          <ScrollView style={styles.modal} contentContainerStyle={{ padding: 16, paddingTop: 48, paddingBottom: 40 }}>
            <Text style={styles.modalTitle}>{draft.id ? "Editar estudio" : "Nuevo estudio"}</Text>

            {!draft.id && (
              <>
                <Text style={styles.label}>Paciente</Text>
                <View style={styles.chips}>
                  {patients.map((p) => {
                    const active = p.id === draft.patientId;
                    return (
                      <Pressable
                        key={p.id}
                        style={[styles.chip, active && styles.chipActive]}
                        onPress={() => setDraft({ ...draft, patientId: p.id })}
                      >
                        <Text style={[styles.chipText, active && styles.chipTextActive]}>{name(p)}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              </>
            )}

            {TYPES.map((t) => (
              <View key={t.key} style={[styles.block, shadow]}>
                <Text style={styles.blockTitle}>{t.label}</Text>
                <Pressable style={styles.dateField} onPress={() => setPickerFor(t.key)}>
                  <Ionicons name="calendar-outline" size={16} color={theme.purple600} />
                  <Text>{draft.dates[t.key].toLocaleDateString("es-MX")}</Text>
                </Pressable>
                <View style={styles.chips}>
                  {RESULTS.map((r) => {
                    const active = draft.res[t.key] === r;
                    return (
                      <Pressable
                        key={r}
                        style={[styles.chip, active && styles.chipActive]}
                        onPress={() => setDraft({ ...draft, res: { ...draft.res, [t.key]: r } })}
                      >
                        <Text style={[styles.chipText, active && styles.chipTextActive]}>{r}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ))}

            <Pressable style={[styles.primary, shadow, saving && { opacity: 0.6 }]} onPress={save} disabled={saving}>
              <Text style={styles.primaryText}>{saving ? "Guardando..." : "Guardar"}</Text>
            </Pressable>
            <Pressable style={styles.cancel} onPress={() => setDraft(null)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>

            <DateTimePickerModal
              isVisible={!!pickerFor}
              mode="date"
              date={pickerFor ? draft.dates[pickerFor] : new Date()}
              onConfirm={(d) => {
                if (pickerFor) setDraft({ ...draft, dates: { ...draft.dates, [pickerFor]: d } });
                setPickerFor(null);
              }}
              onCancel={() => setPickerFor(null)}
            />
          </ScrollView>
        )}
      </Modal>
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
  card: { backgroundColor: "#fff", borderRadius: 18, padding: 14, marginBottom: 12 },
  patient: { fontWeight: "700", color: theme.gray800, fontSize: 16, marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 6 },
  rowLabel: { color: theme.gray700, fontSize: 14 },
  rowDate: { color: theme.gray500, fontSize: 12 },
  badge: { fontSize: 12, fontWeight: "600", borderWidth: 1, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  error: { color: theme.danger, textAlign: "center", marginTop: 24 },
  empty: { color: theme.gray500, textAlign: "center", marginTop: 24 },
  modal: { flex: 1, backgroundColor: theme.purple100 },
  modalTitle: { fontSize: 22, fontWeight: "bold", color: theme.gray800, marginBottom: 8 },
  label: { fontWeight: "600", color: theme.gray700, marginTop: 12, marginBottom: 8 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: theme.purple200,
  },
  chipActive: { backgroundColor: theme.purple600, borderColor: theme.purple600 },
  chipText: { color: theme.gray700 },
  chipTextActive: { color: "#fff", fontWeight: "600" },
  block: { backgroundColor: "#fff", borderRadius: 16, padding: 14, marginTop: 16, gap: 10 },
  blockTitle: { fontWeight: "700", color: theme.gray800 },
  dateField: { flexDirection: "row", alignItems: "center", gap: 8 },
  primary: { backgroundColor: theme.purple600, borderRadius: 14, paddingVertical: 15, alignItems: "center", marginTop: 24 },
  primaryText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  cancel: { alignItems: "center", marginTop: 16 },
  cancelText: { color: theme.gray500, fontWeight: "600" },
});
