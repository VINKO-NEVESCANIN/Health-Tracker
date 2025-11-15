import { View, Text, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

export function Card({ title, subtitle }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.m,
    borderRadius: theme.radius.m,
    marginBottom: theme.spacing.m,
  },
  title: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#999",
    fontSize: 14,
  },
});
