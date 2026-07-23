import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { createPatient } from "@services/api";
import { useAuth } from "@context/auth";
import { theme, shadow } from "@constants/theme";

export default function AgregarPaciente() {
  const router = useRouter();
  const { user } = useAuth();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!form.firstName.trim() || !form.email.trim() || !form.password) {
      setError("Nombre, correo y contraseña temporal son obligatorios.");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await createPatient({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim() || undefined,
        email: form.email.trim(),
        password: form.password,
        doctorId: user?.id,
      });
      Alert.alert("Listo", "Paciente agregado correctamente.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (err: any) {
      setError(err?.response?.data?.error ?? "No se pudo agregar al paciente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={theme.purple600} />
        </Pressable>
        <Text style={styles.title}>Agregar Paciente</Text>
      </View>

      <View style={[styles.card, shadow]}>
        <Field label="Nombre" value={form.firstName} onChangeText={(v) => handleChange("firstName", v)} placeholder="Nombre" />
        <Field label="Apellido" value={form.lastName} onChangeText={(v) => handleChange("lastName", v)} placeholder="Apellido" />
        <Field
          label="Correo electrónico"
          value={form.email}
          onChangeText={(v) => handleChange("email", v)}
          placeholder="correo@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Field
          label="Contraseña temporal"
          value={form.password}
          onChangeText={(v) => handleChange("password", v)}
          placeholder="El paciente podrá cambiarla después"
          secureTextEntry
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <Pressable style={[styles.button, saving && { opacity: 0.6 }]} onPress={handleSubmit} disabled={saving}>
          {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Guardar Paciente</Text>}
        </Pressable>
      </View>
    </ScrollView>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  keyboardType?: "default" | "email-address";
  autoCapitalize?: "none" | "sentences";
  secureTextEntry?: boolean;
}) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        placeholderTextColor={theme.gray400}
        value={props.value}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
        autoCapitalize={props.autoCapitalize}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.purple100 },
  content: { padding: 16, paddingTop: 48, paddingBottom: 40 },
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
  card: { backgroundColor: "#fff", borderRadius: 20, padding: 20 },
  fieldGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: "600", color: theme.gray700, marginBottom: 6 },
  input: {
    backgroundColor: theme.purple50,
    borderWidth: 1,
    borderColor: theme.purple200,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: theme.gray800,
  },
  error: { color: theme.danger, marginBottom: 12, fontSize: 13 },
  button: { backgroundColor: theme.purple600, borderRadius: 14, paddingVertical: 15, alignItems: "center", marginTop: 6 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
