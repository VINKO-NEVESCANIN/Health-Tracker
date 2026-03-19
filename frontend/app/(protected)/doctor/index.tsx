import { View, Text, StyleSheet } from "react-native";

export default function DoctorHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido Doctor 👨‍⚕️</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a", justifyContent: "center", alignItems: "center" },
  text: { color: "#f9fafb", fontSize: 18 },
});
