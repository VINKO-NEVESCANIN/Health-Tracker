import { View, Text } from "react-native";

export default function DoctorScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        👨‍⚕️ Vista del Doctor
      </Text>
      <Text>Aquí se listarán los pacientes y sus episodios.</Text>
    </View>
  );
}
