import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, ImageBackground } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getDateCrisisByRange, getPatientCrisis } from "@/services/api";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";

export default function LineaDeCrisis() {
  const [eventos, setEventos] = useState([]);
  const [patientId, setPatientId] = useState<number | null>(null);
  const {startDate, endDate} = useLocalSearchParams<{startDate: string, endDate: string}>();
  const [primeraCrisis, setPrimeraCrisis] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode<{ userId: number }>(token);
        setPatientId(decoded.userId);
        console.log("Token cargado, patientId:", startDate, endDate);
      }
    };
    loadToken();
  }, []);

  useEffect(() => {
    if (!patientId) return;
    const cargar = async () => {
      try {
        const todas = await getPatientCrisis(patientId);
        if(todas.length > 0){
          const primera = todas.sort((a, b) => 
          new Date(a.crisisDate).getTime() - new Date(b.crisisDate).getTime())[0];
          setPrimeraCrisis(primera.crisisDate);
        }

        const data = await getDateCrisisByRange(patientId, new Date(startDate), new Date(endDate));
        setEventos(data);
      } catch (err: any) {
        console.error("Error cargando crisis:", err.response?.data || err.message);
      }
    };
    cargar();
  }, [patientId, startDate, endDate]);

  const formatFecha = (date: Date) => {
  const tzOffset = date.getTimezoneOffset() * 60000;
  const localISO = new Date(date.getTime() - tzOffset).toISOString().split("T")[0];
  return localISO;
};

  return (
    <ImageBackground
      source={require("../../assets/FondoApp.png")}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={styles.title}>Línea de Crisis</Text>

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

              if (primeraCrisis && new Date(ev.crisisDate).getTime() === new Date(primeraCrisis).getTime()) {
                color = "yellow"; // primera crisis
              } else {
                const prev = arr[index - 1];
                if (prev && ev.medication !== prev.medication) {
                  color = "red"; // cambio de medicamento
                  console.log("Cambio de medicamento detectado en crisis:", primeraCrisis);
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