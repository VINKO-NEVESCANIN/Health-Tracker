import { useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, Switch, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { createCrisis } from "@services/api";
import { useAuth } from "@context/auth";
import { theme, shadow } from "@constants/theme";

const minutes = (n: number) =>
  Array.from({ length: n }, (_, i) => ({ label: `${i + 1} min`, value: i + 1 }));

export default function RegistroCrisis() {
  const { patientId: patientIdParam } = useLocalSearchParams<{ patientId?: string }>();
  const { user } = useAuth();
  const router = useRouter();
  // Doctor desde el perfil de un paciente -> ese id; paciente -> su propio id.
  const patientId = patientIdParam ? Number(patientIdParam) : user?.id;

  const [duracion, setDuracion] = useState(1);
  const [recuperacion, setRecuperacion] = useState(1);
  const [fecha, setFecha] = useState(new Date());
  const [showFecha, setShowFecha] = useState(false);
  const [inconsciente, setInconsciente] = useState(false);
  const [saving, setSaving] = useState(false);

  const guardar = () => {
    if (!patientId) {
      Alert.alert("Error", "No se pudo identificar al paciente.");
      return;
    }
    setSaving(true);
    createCrisis({
      patientId,
      date: fecha.toISOString(),
      duration: duracion,
      recuperation: recuperacion,
      unconscius: inconsciente,
    })
      .then(() => {
        Alert.alert("Listo", "Crisis registrada correctamente.");
        router.back();
      })
      .catch((err) => {
        console.error("Error registrando crisis:", err);
        Alert.alert("Error", "No se pudo registrar la crisis.");
      })
      .finally(() => setSaving(false));
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Fecha de la crisis</Text>
      <Pressable style={[styles.field, shadow]} onPress={() => setShowFecha(true)}>
        <Ionicons name="calendar-outline" size={18} color={theme.purple600} />
        <Text style={styles.fieldText}>
          {fecha.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}
        </Text>
      </Pressable>
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

      <Text style={styles.label}>Duración de la crisis</Text>
      <View style={[styles.pickerBox, shadow]}>
        <Picker selectedValue={duracion} onValueChange={(v) => setDuracion(Number(v))}>
          {minutes(60).map((i) => (
            <Picker.Item key={i.value} label={i.label} value={i.value} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Tiempo de recuperación</Text>
      <View style={[styles.pickerBox, shadow]}>
        <Picker selectedValue={recuperacion} onValueChange={(v) => setRecuperacion(Number(v))}>
          {minutes(60).map((i) => (
            <Picker.Item key={i.value} label={i.label} value={i.value} />
          ))}
        </Picker>
      </View>

      <View style={[styles.switchRow, shadow]}>
        <Text style={styles.switchText}>¿Hubo pérdida de conciencia?</Text>
        <Switch
          value={inconsciente}
          onValueChange={setInconsciente}
          trackColor={{ false: theme.purple200, true: theme.purple500 }}
          thumbColor="#fff"
        />
      </View>

      <Pressable style={[styles.primary, shadow, saving && { opacity: 0.6 }]} onPress={guardar} disabled={saving}>
        <Text style={styles.primaryText}>{saving ? "Guardando..." : "Guardar crisis"}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.purple100 },
  content: { padding: 16, paddingBottom: 40 },
  label: { fontWeight: "600", color: theme.gray700, marginTop: 16, marginBottom: 8 },
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
  },
  fieldText: { color: theme.gray800 },
  pickerBox: { backgroundColor: "#fff", borderRadius: 14, overflow: "hidden" },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginTop: 20,
  },
  switchText: { color: theme.gray800, flex: 1, marginRight: 12 },
  primary: {
    backgroundColor: theme.purple600,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 24,
  },
  primaryText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});
