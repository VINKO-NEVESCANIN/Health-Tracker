import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, FlatList, ImageBackground, StyleSheet, Text, TextInput, Pressable } from "react-native";
import { getPatients } from "../../services/api"; // 👈 servicio axios

export default function Pacientes() {
  const params = useLocalSearchParams();
  const condition = params.condition;

  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  getPatients()
    .then(data => {
      console.log("Pacientes recibidos:", data); // 👀 revisa en consola
      setPatients(data);
    })
    .catch(err => console.error("Error cargando pacientes:", err));
}, []);

  // Filtrar pacientes por búsqueda
  const filtered = patients.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Cargando pacientes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/FondoApp.png')}
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
                <Text>{item.name}</Text>
                <Text>{item.email}</Text>
                <Text>{item.phone}</Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.ListaPacientes}
                onPress={() => router.push({
                  pathname: '../../paciente/EditarPaciente',
                  params: { id: item.id }
                })}
              >
                <Text>{item.name}</Text>
                <Text>{item.email}</Text>
                <Text>{item.phone}</Text>
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
