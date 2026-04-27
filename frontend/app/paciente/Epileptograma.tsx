import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, ImageBackground } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getPatientCrisis } from "@/services/api";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LineaDeCrisis() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [eventos, setEventos] = useState([]);
  const [patientId, setPatientId] = useState<number | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode<{ userId: number }>(token);
        setPatientId(decoded.userId);
      }
    };
    loadToken();
  }, []);

  useEffect(() => {
    if (!patientId) return;
    const cargar = async () => {
      try {
        const data = await getPatientCrisis(patientId);
        setEventos(data);
      } catch (err: any) {
        console.error("Error cargando crisis:", err.response?.data || err.message);
      }
    };
    cargar();
  }, [patientId]);

  return (
    <ImageBackground
      source={require("../../assets/FondoApp.png")}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={styles.title}>Línea de Crisis</Text>

        <DateTimePicker
          value={fechaSeleccionada}
          mode="date"
          display="default"
          onChange={(event, date) => date && setFechaSeleccionada(date)}
        />

        <ScrollView horizontal contentContainerStyle={styles.timeline}>
          <View style={styles.lineBase} />
          {eventos
            .sort(
              (a, b) =>
                new Date(a.crisisDate).getTime() -
                new Date(b.crisisDate).getTime()
            )
            .map((ev, index, arr) => {
              let icon = "▲";
              let color = "gray";

              if (index === 0) {
                color = "yellow"; // primera crisis
              } else {
                const prev = arr[index - 1];
                if (ev.medication !== prev.medication) {
                  color = "red"; // cambio de medicamento
                }
              }

              return (
                <View key={index} style={styles.event}>
                  <Text style={[styles.icon, { color }]}>{icon}</Text>
                  <Text style={styles.date}>
                    {new Date(ev.crisisDate).toLocaleDateString("es-MX", { timeZone: "UTC" })}
                  </Text>
                  <Text style={{ fontSize: 12 }}>{ev.medication}</Text>
                </View>
              );
            })}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  timeline: {
    flexDirection: "row",
    marginBottom: 20,
    position: "relative",
    alignItems: "flex-start",
    justifyContent: "center",
    height: 200,
  },
  lineBase: {
    position: "absolute",
    top: "50%",
    left: 57,
    right: 0,
    height: 2,
    backgroundColor: "black",
  },
  event: { alignItems: "center", marginHorizontal: 40, marginTop: "15%" },
  icon: { fontSize: 28, marginTop: -14 },
  date: { marginTop: 8, fontSize: 14 },
});
