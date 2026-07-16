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
import { useRouter } from "expo-router";
import { useAuth } from "@context/auth";

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
      // Paciente en su primer login: lo mandamos a completar su perfil
      // antes de dejarlo entrar al menú normal.
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Health Tracker</Text>
      <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#71717a"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#71717a"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <Pressable
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#0a0a0a" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    color: "#f9fafb",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    color: "#a1a1aa",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#18181b",
    color: "#f9fafb",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#27272a",
  },
  error: {
    color: "#f87171",
    marginBottom: 14,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4ade80",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#0a0a0a",
    fontWeight: "bold",
    fontSize: 16,
  },
});
