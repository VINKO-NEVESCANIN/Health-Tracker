import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, ImageBackground } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getPatientCrisis } from "@/services/api";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";

export default function LineaDeCrisis() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [eventos, setEventos] = useState([]);
  const [patientId, setPatientId] = useState<number | null>(null);
  const [showFechaSeleccionada, setShowFechaSeleccionada] = useState(false);
  const {fecha1, fecha2} = useLocalSearchParams<{fecha1: string, fecha2: string}>();

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

    {showFechaSeleccionada && ( 
        <DateTimePicker
          value={fechaSeleccionada}
          mode="date"
          display="default"
          onChange={(eventos, date) => {
            setShowFechaSeleccionada(false);
            if (date) setFechaSeleccionada(date);
            
          }}
        />
        )}

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
                  <View style={styles.iconWrapper}>
                    <Text style={[styles.icon, { color }]}>{icon}</Text>
                  </View>
                  <Text style={styles.date}>
                    {new Date(ev.crisisDate).toLocaleDateString("es-MX", { timeZone: "UTC" })}
                  </Text>
                  <Text style={styles.med}>{ev.medication}</Text>
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
    alignItems: "center",
    position: "relative",
    height: 200,
  },
  lineBase: {
    position: "absolute",
    top: "80%",
    left: 60,
    right: 0,
    height: 2,
    backgroundColor: "black",
  },
  event: {
    alignItems: "center",
    marginHorizontal: 40,
  },
  iconWrapper: {
    position: "absolute",
    top: "77%",       // 👈 ícono siempre sobre la línea
    transform: [{ translateY: -14 }], // ajusta para centrar el triángulo
  },
  icon: { fontSize: 28 },
  date: { marginTop: 180, fontSize: 14 }, // 👈 fecha debajo
  med: { fontSize: 12, color: "red", minHeight: 16 },  // 👈 medicamento debajo
});