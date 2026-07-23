import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@context/auth";

// Colores tomados del diseño de Figma (paleta morada)
const colors = {
  gradientFrom: "#a855f7", // purple-500
  gradientTo: "#7e22ce", // purple-700
  inputBg: "#faf5ff", // purple-50
  inputBorder: "#e9d5ff", // purple-200
  primary: "#9333ea", // purple-600
  primaryDark: "#7e22ce", // purple-700
  text: "#1f2937", // gray-800
  muted: "#6b7280", // gray-500
  placeholder: "#9ca3af", // gray-400
};

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setError("Ingresa tu correo y contraseña.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const loggedUser = await login(email.trim(), password);
      if (loggedUser.role?.toLowerCase() === "paciente" && loggedUser.firstTime) {
        router.replace({
          pathname: "/(protected)/paciente/EditarPaciente",
          params: { id: String(loggedUser.id) },
        });
      }
      // En cualquier otro caso, app/index.tsx redirige a /(protected)/home
      // automáticamente en cuanto el AuthProvider actualiza el usuario.
    } catch (err: any) {
      const msg =
        err?.response?.data?.error ?? "No se pudo iniciar sesión. Verifica tus datos.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[colors.gradientFrom, colors.gradientTo]}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.card}>
          <View style={styles.logoCircle}>
            <Ionicons name="person" size={40} color="#fff" />
          </View>
          <Text style={styles.title}>Health Tracker</Text>
          <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo electrónico</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color={colors.placeholder} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="tu@correo.com"
                placeholderTextColor={colors.placeholder}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.placeholder} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={colors.placeholder}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          {error && <Text style={styles.error}>{error}</Text>}

          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: colors.muted,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 28,
  },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: "600", color: colors.text, marginBottom: 6 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 14,
    paddingHorizontal: 12,
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 14, color: colors.text },
  error: { color: "#dc2626", marginBottom: 12, fontSize: 13, textAlign: "center" },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 4,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
