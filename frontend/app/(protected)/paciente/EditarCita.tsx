import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  getUsers,
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "@services/api";
import { theme, shadow } from "@constants/theme";

interface Patient {
  id: number;
  firstName: string | null;
  lastName: string | null;
}

const fmtTime = (d: Date) =>
  d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit", hour12: true });

// Crea una cita (sin params, o con patientId) o edita una existente (appointmentId)
export default function EditarCita() {
  const router = useRouter();
  const { appointmentId, patientId: patientParam } = useLocalSearchParams<{
    appointmentId?: string;
    patientId?: string;
  }>();
  const editing = !!appointmentId;

  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientId, setPatientId] = useState<number | null>(patientParam ? Number(patientParam) : null);
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [showFecha, setShowFecha] = useState(false);
  const [showHora, setShowHora] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const list = await getUsers({ role: "Paciente" });
        setPatients(Array.isArray(list) ? list : []);
        if (editing) {
          const all = await getAppointments();
          const a = all.find((x) => String(x.id) === appointmentId);
          if (a) {
            setPatientId(a.patientId);
            setFecha(new Date(a.date));
            setNotes(a.notes ?? "");
            // la hora se guarda como texto; si no se puede leer, se deja la actual
            setHora(new Date());
          }
        }
      } catch {
        Alert.alert("Error", "No se pudieron cargar los datos.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [appointmentId, editing]);

  const guardar = async () => {
    if (!patientId) {
      Alert.alert("Falta el paciente", "Selecciona un paciente para la cita.");
      return;
    }
    setSaving(true);
    try {
      const payload = { date: fecha.toISOString(), time: fmtTime(hora), notes };
      if (editing) await updateAppointment(Number(appointmentId), payload);
      else await createAppointment({ patientId, ...payload });
      router.back();
    } catch {
      Alert.alert("Error", "No se pudo guardar la cita.");
    } finally {
      setSaving(false);
    }
  };

  const eliminar = () => {
    Alert.alert("Eliminar cita", "¿Seguro que quieres eliminar esta cita?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteAppointment(Number(appointmentId));
            router.back();
          } catch {
            Alert.alert("Error", "No se pudo eliminar la cita.");
          }
        },
      },
    ]);
  };

  if (loading) return <ActivityIndicator size="large" color={theme.purple600} style={{ marginTop: 48 }} />;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Paciente</Text>
      <View style={styles.chips}>
        {patients.length === 0 && <Text style={styles.hint}>No hay pacientes registrados.</Text>}
        {patients.map((p) => {
          const active = p.id === patientId;
          return (
            <Pressable
              key={p.id}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => setPatientId(p.id)}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {`${p.firstName ?? ""} ${p.lastName ?? ""}`.trim() || `Paciente ${p.id}`}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.label}>Fecha</Text>
      <Pressable style={[styles.field, shadow]} onPress={() => setShowFecha(true)}>
        <Ionicons name="calendar-outline" size={18} color={theme.purple600} />
        <Text style={styles.fieldText}>
          {fecha.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </Text>
      </Pressable>

      <Text style={styles.label}>Hora</Text>
      <Pressable style={[styles.field, shadow]} onPress={() => setShowHora(true)}>
        <Ionicons name="time-outline" size={18} color={theme.purple600} />
        <Text style={styles.fieldText}>{fmtTime(hora)}</Text>
      </Pressable>

      <Text style={styles.label}>Resumen de la cita</Text>
      <TextInput
        style={[styles.textarea, shadow]}
        multiline
        numberOfLines={4}
        placeholder="Escribe aquí un comentario"
        placeholderTextColor={theme.gray400}
        value={notes}
        onChangeText={setNotes}
      />

      <Pressable style={[styles.primary, shadow, saving && { opacity: 0.6 }]} onPress={guardar} disabled={saving}>
        <Text style={styles.primaryText}>{saving ? "Guardando..." : editing ? "Guardar cambios" : "Crear cita"}</Text>
      </Pressable>

      {editing && (
        <Pressable style={styles.danger} onPress={eliminar}>
          <Ionicons name="trash-outline" size={18} color={theme.danger} />
          <Text style={styles.dangerText}>Eliminar cita</Text>
        </Pressable>
      )}

      <DateTimePickerModal
        isVisible={showFecha}
        mode="date"
        date={fecha}
        onConfirm={(d) => {
          setFecha(d);
          setShowFecha(false);
        }}
        onCancel={() => setShowFecha(false)}
      />
      <DateTimePickerModal
        isVisible={showHora}
        mode="time"
        date={hora}
        onConfirm={(d) => {
          setHora(d);
          setShowHora(false);
        }}
        onCancel={() => setShowHora(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.purple100 },
  content: { padding: 16, paddingBottom: 40 },
  label: { fontWeight: "600", color: theme.gray700, marginTop: 16, marginBottom: 8 },
  hint: { color: theme.gray500 },
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
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
  },
  fieldText: { color: theme.gray800, textTransform: "capitalize" },
  textarea: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    minHeight: 100,
    textAlignVertical: "top",
    color: theme.gray800,
  },
  primary: {
    backgroundColor: theme.purple600,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 24,
  },
  primaryText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  danger: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6, marginTop: 18 },
  dangerText: { color: theme.danger, fontWeight: "600" },
});
