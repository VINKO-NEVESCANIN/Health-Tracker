import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, FlatList, ImageBackground, StyleSheet, Text, TextInput, Pressable } from "react-native";
import { getUsers } from "@services/api";

export default function Pacientes() {
  const params = useLocalSearchParams();
  const condition = params.condition;

  interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
  }

  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  getUsers()
    .then(data => {
      console.log("Pacientes recibidos:", data);
      setPatients(Array.isArray(data) ? data : data?.patients ?? []);
    })
    .catch(err => {
      console.error("Error cargando pacientes:", err.response?.data || err.message);
      setError("No se pudieron cargar los pacientes");
    })
    .finally(() => setLoading(false));
}, []);

const filtered = patients.filter(p =>
  `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase())
);

  if (loading) {
    return (
      <View>
        <Text>Cargando pacientes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../../assets/images/FondoApp.png')}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.pantalla}>
        <TextInput
          style={styles.input}
          placeholder="Buscar Paciente"
          placeholderTextColor={"#000000ff"}
          value={search}
          onChangeText={setSearch}
        />

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.contenedor}
          renderItem={({ item }) => (
            condition === '1' ? (
              <Pressable
                style={styles.ListaPacientes}
                onPress={() => router.push({
                  pathname: '../../paciente/EditarCita',
                  params: { id: item.id }
                })}
              >
                <Text>{item.firstName} {item.lastName}</Text>
                <Text>{item.email ?? 'Sin email'}</Text>
                <Text>{item.gender ?? 'Sin género'}</Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.ListaPacientes}
                onPress={() => router.push({
                  pathname: '../../paciente/EditarPaciente',
                  params: { id: item.id }
                })}
              >
                <Text>{item.firstName} {item.lastName}</Text>
                <Text>{item.email ?? 'Sin email'}</Text>
                <Text>{item.gender ?? 'Sin género'}</Text>
              </Pressable>
            )
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: { flex: 1 },
  ListaPacientes: {
    backgroundColor: '#C9B1FF',
    justifyContent: 'center',
    width: '100%',
    height: 120,
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 20,
  },
  pantalla: {
    flex: 1,
    paddingTop: 40,
  },
  contenedor: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  input: {
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: "#000000ff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    width: '90%',
  },
});