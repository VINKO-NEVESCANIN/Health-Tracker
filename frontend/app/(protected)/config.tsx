import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@context/auth";
import { theme, shadow } from "@constants/theme";

export default function ConfigScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <Pressable style={styles.back} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color={theme.purple600} />
      </Pressable>
      <Text style={styles.title}>Ajustes</Text>

      {user && (
        <View style={[styles.card, shadow]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(user.firstName ?? user.email).charAt(0).toUpperCase()}</Text>
          </View>
          <View>
            <Text style={styles.name}>{user.firstName ?? user.email}</Text>
            <Text style={styles.meta}>{user.email}</Text>
            <Text style={styles.role}>{user.role}</Text>
          </View>
        </View>
      )}

      <Pressable style={[styles.logout, shadow]} onPress={logout}>
        <Ionicons name="log-out-outline" size={20} color={theme.danger} />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.purple100, padding: 16, paddingTop: 48 },
  back: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: theme.gray800, marginVertical: 16 },
  card: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: "#fff", borderRadius: 18, padding: 16, marginBottom: 20 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: theme.purple500, justifyContent: "center", alignItems: "center" },
  avatarText: { color: "#fff", fontWeight: "bold", fontSize: 20 },
  name: { fontWeight: "700", color: theme.gray800, fontSize: 16 },
  meta: { color: theme.gray500, fontSize: 13, marginTop: 2 },
  role: { color: theme.purple600, fontSize: 12, fontWeight: "600", marginTop: 2 },
  logout: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "#fff", borderRadius: 14, paddingVertical: 14 },
  logoutText: { color: theme.danger, fontWeight: "bold", fontSize: 15 },
});
