import {useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-native";
import { ImageBackground, View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import {deletePatientMedication, getPatientMedications} from "@services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useFocusEffect } from "@react-navigation/native";

// ✅ IMPORT
import fondo from '@assets/images/FondoApp.png';

export default function MisMedicamentos() {

  const [PatientId, setPatientId] = useState<number | null>(null);
  const [listMedications, setListMedications] = useState<any[]>([]);

  useFocusEffect(
  React.useCallback(() => {
    if (PatientId) {
      getPatientMedications(PatientId)
        .then(data => {
          setListMedications(Array.isArray(data) ? data : data?.medications ?? []);
        })
        .catch(err => console.error("Error cargando medicamentos:", err));
    }
  }, [PatientId])
);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("token"); // 👈 leer token
        if (token) {
          const decoded = jwtDecode<{ userId: number }>(token); // 👈 decodificar
          setPatientId(decoded.userId);
        }
      };
      loadToken();
    }, []);

    const alertConfirmDelete = (id: number) => {
      Alert.alert(
        "Confirmar eliminación",
        "¿Estás seguro de que deseas eliminar este medicamento?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Eliminar",
            onPress: async () => {
              try {
                await deletePatientMedication(id);
                setListMedications((listMedications) =>
                  listMedications.filter((m) => m.id !== id)
                );
              } catch (error) {
                console.error("Error eliminando medicamento:", error);
              }
            },
          },
        ]
      );
    };

  const router = useRouter();

  return (
    <ImageBackground source={fondo} style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {listMedications.map((med) => (
    <View key={med.id} style={styles.card}>
      <Text style={styles.title}>{med.medication?.name || "Sin nombre"}</Text>
      <Text>Presentación: {med.presentation || "Ninguna"}</Text>
      <Text>Dosis: {med.dose || "Ninguna"} </Text>
      <Text>Frecuencia: {med.interval ? `${med.interval} horas` : "Ninguna"}</Text>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => alertConfirmDelete(med.id)}
      >
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
    </View>
  ))}

  <Button
    color="#6631D7"
    title="Agregar Medicamento"
    onPress={() => router.push("../paciente/AgregarMedicamento")}
  />
</ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: "#C9B1FF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    position: "relative",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  deleteBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#e74c3c",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
