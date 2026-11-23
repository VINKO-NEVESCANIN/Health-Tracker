import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getUserById, updateInfo } from "@services/api";
import { useAuth } from "@context/auth";
import { theme, shadow } from "@constants/theme";
import KeyboardScreen from "@components/KeyboardScreen";

const GENDERS = ["Masculino", "Femenino", "Otro"];
const EPILEPSY_TYPES = ["Focal", "Generalizada", "Focal y generalizada", "Desconocida"];
const CONDITIONS = [
  { key: "anxiety", label: "Ansiedad" },
  { key: "migraine", label: "Migraña" },
  { key: "addictions", label: "Adicciones" },
  { key: "hypertension", label: "Hipertensión" },
  { key: "cogniDisorder", label: "Trastorno cognitivo" },
  { key: "respiDisorder", label: "Trastorno respiratorio" },
] as const;

type CondKey = (typeof CONDITIONS)[number]["key"];

const fmtDate = (d: Date | null) =>
  d ? d.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" }) : "Seleccionar fecha";

export default function EditarPaciente() {
  const router = useRouter();
  const { user } = useAuth();
  const { id: idParam } = useLocalSearchParams<{ id?: string }>();
  const id = idParam ? Number(idParam) : null;
  const isSelf = !!user && user.id === id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState<string | null>(null);
  const [epilepsyType, setEpilepsyType] = useState<string | null>(null);
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [firstCrisis, setFirstCrisis] = useState<Date | null>(null);
  const [picker, setPicker] = useState<"birth" | "crisis" | null>(null);
  const [checks, setChecks] = useState<Record<CondKey, boolean>>({
    anxiety: false,
    migraine: false,
    addictions: false,
    hypertension: false,
    cogniDisorder: false,
    respiDisorder: false,
  });

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    getUserById(id)
      .then((p) => {
        setFirstTime(!!p.firstTime);
        setFirstName(p.firstName ?? "");
        setLastName(p.lastName ?? "");
        setHeight(p.height ?? "");
        setWeight(p.weight ?? "");
        setGender(p.gender ?? null);
        setEpilepsyType(p.epilepsyType ?? null);
        setBirthdate(p.birthdate ? new Date(p.birthdate) : null);
        setFirstCrisis(p.firstCrisisDate ? new Date(p.firstCrisisDate) : null);
        setChecks({
          anxiety: !!p.anxiety,
          migraine: !!p.migraine,
          addictions: !!p.addictions,
          hypertension: !!p.hypertension,
          cogniDisorder: !!p.cogniDisorder,
          respiDisorder: !!p.respiDisorder,
        });
      })
      .catch(() => Alert.alert("Error", "No se pudieron cargar los datos."))
      .finally(() => setLoading(false));
  }, [id]);

  const guardar = async () => {
    if (!id) {
      Alert.alert("Error", "No se pudo identificar al paciente.");
      return;
    }
    if (!firstName.trim()) {
      Alert.alert("Falta información", "Escribe el nombre.");
      return;
    }
    setSaving(true);
    try {
      await updateInfo(id, {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        height: height.trim(),
        weight: weight.trim(),
        gender,
        epilepsyType,
        birthdate: birthdate?.toISOString(),
        firstCrisisDate: firstCrisis?.toISOString(),
        ...checks,
      });
      if (isSelf && firstTime) router.replace("/(protected)/home");
      else router.back();
    } catch {
      Alert.alert("Error", "No se pudo guardar. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color={theme.purple600} style={{ marginTop: 48 }} />;

  const Chips = ({ options, value, onChange }: { options: string[]; value: string | null; onChange: (v: string) => void }) => (
    <View style={styles.chips}>
      {options.map((o) => {
        const active = o === value;
        return (
          <Pressable key={o} style={[styles.chip, active && styles.chipActive]} onPress={() => onChange(o)}>
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{o}</Text>
          </Pressable>
        );
      })}
    </View>
  );

  const DateField = ({ value, onPress }: { value: Date | null; onPress: () => void }) => (
    <Pressable style={[styles.field, shadow]} onPress={onPress}>
      <Ionicons name="calendar-outline" size={18} color={theme.purple600} />
      <Text style={[styles.fieldText, !value && { color: theme.gray400 }]}>{fmtDate(value)}</Text>
    </Pressable>
  );

  return (
    <KeyboardScreen style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Stack.Screen
        options={{
          title: isSelf && firstTime ? "Completa tu perfil" : "Editar paciente",
          headerBackVisible: !(isSelf && firstTime),
        }}
      />
      {isSelf && firstTime && (
        <Text style={styles.intro}>Cuéntanos un poco sobre ti para empezar. Podrás cambiarlo después.</Text>
      )}

      <Text style={styles.section}>Datos personales</Text>
      <Text style={styles.label}>Nombre</Text>
      <TextInput style={[styles.input, shadow]} value={firstName} onChangeText={setFirstName} placeholder="Nombre" placeholderTextColor={theme.gray400} />
      <Text style={styles.label}>Apellidos</Text>
      <TextInput style={[styles.input, shadow]} value={lastName} onChangeText={setLastName} placeholder="Apellidos" placeholderTextColor={theme.gray400} />

      <View style={styles.twoCols}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Altura (cm)</Text>
          <TextInput style={[styles.input, shadow]} value={height} onChangeText={setHeight} keyboardType="numeric" placeholder="170" placeholderTextColor={theme.gray400} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Peso (kg)</Text>
          <TextInput style={[styles.input, shadow]} value={weight} onChangeText={setWeight} keyboardType="numeric" placeholder="70" placeholderTextColor={theme.gray400} />
        </View>
      </View>

      <Text style={styles.label}>Género</Text>
      <Chips options={GENDERS} value={gender} onChange={setGender} />

      <Text style={styles.label}>Fecha de nacimiento</Text>
      <DateField value={birthdate} onPress={() => setPicker("birth")} />

      <Text style={styles.section}>Epilepsia</Text>
      <Text style={styles.label}>Tipo de epilepsia</Text>
      <Chips options={EPILEPSY_TYPES} value={epilepsyType} onChange={setEpilepsyType} />
      <Text style={styles.label}>Fecha de la primera crisis</Text>
      <DateField value={firstCrisis} onPress={() => setPicker("crisis")} />

      <Text style={styles.section}>Antecedentes</Text>
      {CONDITIONS.map((c) => (
        <View key={c.key} style={[styles.switchRow, shadow]}>
          <Text style={styles.switchText}>{c.label}</Text>
          <Switch
            value={checks[c.key]}
            onValueChange={(v) => setChecks((prev) => ({ ...prev, [c.key]: v }))}
            trackColor={{ false: theme.purple200, true: theme.purple500 }}
            thumbColor="#fff"
          />
        </View>
      ))}

      <Pressable style={[styles.primary, shadow, saving && { opacity: 0.6 }]} onPress={guardar} disabled={saving}>
        <Text style={styles.primaryText}>{saving ? "Guardando..." : "Guardar"}</Text>
      </Pressable>

      <DateTimePickerModal
        isVisible={picker !== null}
        mode="date"
        date={(picker === "birth" ? birthdate : firstCrisis) ?? new Date()}
        maximumDate={new Date()}
        onConfirm={(d) => {
          if (picker === "birth") setBirthdate(d);
          else setFirstCrisis(d);
          setPicker(null);
        }}
        onCancel={() => setPicker(null)}
      />
    </KeyboardScreen>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.purple100 },
  content: { padding: 16, paddingBottom: 40 },
  intro: { color: theme.gray700, marginBottom: 4 },
  section: { fontSize: 18, fontWeight: "bold", color: theme.purple700, marginTop: 24 },
  label: { fontWeight: "600", color: theme.gray700, marginTop: 14, marginBottom: 8 },
  input: { backgroundColor: "#fff", borderRadius: 14, padding: 14, color: theme.gray800 },
  twoCols: { flexDirection: "row", gap: 12 },
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
  field: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#fff", borderRadius: 14, padding: 14 },
  fieldText: { color: theme.gray800 },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginTop: 10,
  },
  switchText: { color: theme.gray800, flex: 1 },
  primary: { backgroundColor: theme.purple600, borderRadius: 14, paddingVertical: 15, alignItems: "center", marginTop: 28 },
  primaryText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});
