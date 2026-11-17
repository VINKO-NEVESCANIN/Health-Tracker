import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  getMedicationsCatalog,
  createMedicationCatalog,
  getPatientMedications,
  assignMedication,
  deletePatientMedication,
} from "@services/api";
import { useAuth } from "@context/auth";
import { theme, shadow } from "@constants/theme";

interface PatientMed {
  id: number;
  dose: string | null;
  interval: string | null;
  startDate: string | null;
  medication: { id: number; name: string };
}

export default function Medicamentos() {
  const { patientId: patientIdParam } = useLocalSearchParams<{ patientId?: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const patientId = patientIdParam
    ? Number(patientIdParam)
    : user?.role?.toLowerCase() === "paciente"
    ? user.id
    : undefined;

  const [meds, setMeds] = useState<PatientMed[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", dose: "", interval: "" });

  const load = useCallback(() => {
    if (!patientId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getPatientMedications(patientId)
      .then(setMeds)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [patientId]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const handleSubmit = async () => {
    if (!patientId) {
      Alert.alert("Falta paciente", "Entra a esta pantalla desde el perfil de un paciente.");
      return;
    }
    if (!form.name.trim()) {
      Alert.alert("Falta información", "Escribe el nombre del medicamento.");
      return;
    }
    setSaving(true);
    try {
      // Busca el medicamento en el catálogo; si no existe, lo crea.
      const catalog = await getMedicationsCatalog();
      let medication = catalog.find(
        (m: any) => m.name.toLowerCase() === form.name.trim().toLowerCase()
      );
      if (!medication) {
        medication = await createMedicationCatalog({ name: form.name.trim() });
      }
      await assignMedication({
        patientId,
        medicationId: medication.id,
        dose: form.dose || undefined,
        interval: form.interval || undefined,
        startDate: new Date().toISOString(),
      });
      setForm({ name: "", dose: "", interval: "" });
      load();
    } catch (err) {
      Alert.alert("Error", "No se pudo guardar el medicamento.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: number) => {
    Alert.alert("Quitar medicamento", "¿Seguro que quieres quitarlo?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Quitar",
        style: "destructive",
        onPress: () => deletePatientMedication(id).then(load),
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={theme.purple600} />
        </Pressable>
        <Text style={styles.title}>Medicamentos</Text>
      </View>

      {!patientId && (
        <Text style={styles.warning}>
          Entra desde el perfil de un paciente para ver y asignar sus medicamentos.
        </Text>
      )}

      {patientId && (
        <>
          <View style={[styles.form, shadow]}>
            <TextInput
              style={styles.input}
              placeholder="Nombre del medicamento"
              placeholderTextColor={theme.gray400}
              value={form.name}
              onChangeText={(v) => setForm({ ...form, name: v })}
            />
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Dosis (ej. 500mg)"
                placeholderTextColor={theme.gray400}
                value={form.dose}
                onChangeText={(v) => setForm({ ...form, dose: v })}
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Frecuencia (ej. cada 8h)"
                placeholderTextColor={theme.gray400}
                value={form.interval}
                onChangeText={(v) => setForm({ ...form, interval: v })}
              />
            </View>
            <Pressable style={[styles.button, saving && { opacity: 0.6 }]} onPress={handleSubmit} disabled={saving}>
              {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Agregar Medicamento</Text>}
            </Pressable>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={theme.purple600} style={{ marginTop: 20 }} />
          ) : (
            <FlatList
              data={meds}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 24 }}
              ListEmptyComponent={<Text style={styles.empty}>Este paciente no tiene medicamentos asignados.</Text>}
              renderItem={({ item }) => (
                <View style={[styles.card, shadow]}>
                  <View style={styles.cardIcon}>
                    <Ionicons name="medical" size={20} color="#fff" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardName}>{item.medication.name}</Text>
                    <Text style={styles.cardMeta}>
                      {[item.dose, item.interval].filter(Boolean).join(" · ") || "Sin dosis registrada"}
                    </Text>
                  </View>
                  <Pressable onPress={() => handleDelete(item.id)}>
                    <Ionicons name="trash-outline" size={20} color={theme.danger} />
                  </Pressable>
                </View>
              )}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.purple100, padding: 16, paddingTop: 48 },
  header: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 16 },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 20, fontWeight: "bold", color: theme.gray800 },
  warning: { color: theme.gray500, textAlign: "center", marginTop: 24 },
  form: { backgroundColor: "#fff", borderRadius: 18, padding: 16, marginBottom: 16, gap: 10 },
  input: {
    backgroundColor: theme.purple50,
    borderWidth: 1,
    borderColor: theme.purple200,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: theme.gray800,
  },
  button: { backgroundColor: theme.purple600, borderRadius: 12, paddingVertical: 12, alignItems: "center", marginTop: 4 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.indigo500,
    justifyContent: "center",
    alignItems: "center",
  },
  cardName: { fontWeight: "600", color: theme.gray800 },
  cardMeta: { fontSize: 12, color: theme.gray500, marginTop: 2 },
  empty: { color: theme.gray500, textAlign: "center", marginTop: 24 },
});
