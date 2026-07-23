import { useState } from "react";
import { Switch, Button, ImageBackground, ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { createCrisis } from "@services/api";
import { useAuth } from "@context/auth";

export default function RegistroCrisis() {
  const { patientId: patientIdParam } = useLocalSearchParams<{ patientId?: string }>();
  const { user } = useAuth();
  const router = useRouter();
  // Si un doctor navegó aquí desde el perfil de un paciente, usamos ese id;
  // si no, es el propio paciente registrando su crisis.
  const patientId = patientIdParam ? Number(patientIdParam) : user?.id;

  const [duracion, setDuracion] = useState("1 Minutos");
  const [recuperacion, setRecuperacion] = useState("1 Minutos");
  const [fecha1, setFecha1] = useState(new Date());
  const [showFecha1, setShowFecha1] = useState(false);
  const [check, setCheck] = useState(false);
  const [saving, setSaving] = useState(false);

  const items = Array.from({ length: 60 }, (_, i) => ({
    label: `${i + 1} Minutos`,
    value: `${i + 1} Minutos`,
  }));

  const items2 = Array.from({ length: 8 }, (_, i) => ({
    label: `${i + 1} Minutos`,
    value: `${i + 1} Minutos`,
  }));

  const guardar = () => {
    if (!patientId) {
      Alert.alert("Error", "No se pudo identificar al paciente.");
      return;
    }
    setSaving(true);
    createCrisis({
      patientId,
      date: fecha1.toISOString(),
      duration: parseInt(duracion, 10),
      recuperation: parseInt(recuperacion, 10),
      unconscius: check,
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
    <ImageBackground source={require("../../../assets/images/FondoApp.png")} style={styles.fondo} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.contenedor}>
        <Text style={styles.title}>Fecha de la crisis:</Text>
        <Button color='#6631D7' title={fecha1.toLocaleDateString()} onPress={() => setShowFecha1(true)} />
        <DateTimePickerModal
          isVisible={showFecha1}
          mode="date"
          onConfirm={(date) => {
            setFecha1(date);
            setShowFecha1(false);
          }}
          onCancel={() => setShowFecha1(false)}
        />

        <Text style={styles.title}>Duración de la crisis:</Text>
        <Picker style={styles.pickers} selectedValue={duracion} onValueChange={(val) => setDuracion(val)}>
          {items.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>

        <Text style={styles.title}>Tiempo de recuperación:</Text>
        <Picker style={[styles.pickers, { marginBottom: 12 }]} selectedValue={recuperacion} onValueChange={(val) => setRecuperacion(val)}>
          {items2.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
        <View style={styles.checkboxContainer}>
          <Switch value={check} onValueChange={(newValue) => setCheck(newValue)} />
          <Text style={{ marginLeft: 8, fontSize: 18 }}>¿Tuvo pérdida de conciencia?</Text>
        </View>

        <Button color='#6631D7' title={saving ? "Guardando..." : "Guardar"} onPress={guardar} disabled={saving} />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: { flex: 1 },
  contenedor: { paddingHorizontal: 16, paddingBottom: 20 },
  title: { fontSize: 18, marginVertical: 10 },
  
  botones:{
    backgroundColor: "#C9B1FF",
    width: "100%",
    height: "15%",
    borderRadius: 10,
    borderWidth: 2,
  },

  pickers:{
    backgroundColor: "white",
    width: "100%",
    height: "15%",
    borderRadius: 10,
    borderWidth: 2,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
});