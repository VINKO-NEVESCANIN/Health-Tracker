import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Button } from "react-native";
import {StyleSheet, ImageBackground, Text, View, ScrollView } from "react-native";

export default function AgregarMedicamento() {

    const [Gramaje, setGramaje] = useState("");
    const [Meds, setMeds] = useState("");
    const [Presentacion, setPresentacion] = useState("");
    const [Frecuencia, setFrecuencia] = useState("");

    const Presentaciones = [
      { label: "Tabletas", value: "Tabletas" },
      { label: "Jarabe", value: "Jarabe" },
      { label: "Inyecciones", value: "Inyecciones" },
      { label: "Capsulas", value: "Capsulas" },
    ];

  const Medicamentos = Array.from({ length: 10 }, (_, i) => {
    return{
      label: `Medicamento ${i + 1}`,
      value: `medicamento_${i + 1}`
    }
  });
  
    const Pastillas = Array.from({ length: 23 }, (_, i) => {
      const valor = (i + 1) * 50;
      return {
        label: `${valor} Mg`,
        value: `${valor} Mg`,
      };
    });

  const Frecuencias = [
    { label: "6 Horas", value: 6 },
    { label: "8 Horas", value: 8 },
    { label: "12 Horas", value: 12 },
    { label: "24 Horas", value: 24 },
  ];

  const guardar = () => {
    const datos = {
      Gramaje,
      Meds,
      Presentacion,
      Frecuencia
    };
    console.log("Datos guardados:", datos);
  };

  return (
    <ImageBackground source={require("../../assets/FondoApp.png")} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.contenedor}>

        <Text style={styles.title}>Medicamento:</Text>
                <Picker style={[styles.pickers, { marginBottom: 12 }]} selectedValue={Meds} onValueChange={(val) => setMeds(val)}>                
                {Medicamentos.map((item) => (
                    <Picker.Item key={item.value} label={item.label} value={item.value} />
                  ))}
                </Picker>

        <Text style={styles.title}>Presentacion:</Text>
                <Picker style={[styles.pickers, { marginBottom: 12 }]} selectedValue={Presentacion} onValueChange={(val) => setPresentacion(val)}>                
                {Presentaciones.map((item) => (
                    <Picker.Item key={item.value} label={item.label} value={item.value} />
                  ))}
                </Picker>

        <Text style={styles.title}>Gramaje de Pastillas:</Text>
                <Picker style={[styles.pickers, { marginBottom: 12 }]} selectedValue={Gramaje} onValueChange={(val) => setGramaje(val)}>
                  {Pastillas.map((item) => (
                    <Picker.Item key={item.value} label={item.label} value={item.value} />
                  ))}
                </Picker>
        
        <Text style={styles.title}>Frecuencia:</Text>
                <Picker style={[styles.pickers, { marginBottom: 12 }]} selectedValue={Frecuencia} onValueChange={(val) => setFrecuencia(val)}>                
                {Frecuencias.map((item) => (
                    <Picker.Item key={item.value} label={item.label} value={item.value} />
                  ))}
                </Picker>
      
      <View style={styles.Tarjeta}>
        <Text style={styles.title}>Resumen de Medicamento:</Text>
        <Text>Medicamento: {Meds}</Text>
        <Text>Presentación: {Presentacion}</Text>
        <Text>Gramaje: {Gramaje}</Text>
        <Text>Frecuencia: {Frecuencia}</Text>   
      </View>

     <Button color='#6631D7' title="Guardar" onPress={guardar} />

      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: { flex: 1 },
  contenedor: { paddingHorizontal: 16, paddingBottom: 20 },
  title: { fontSize: 18, marginVertical: 10 },
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
  
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
    borderRadius: 10,
    borderWidth: 2,
  },
   Tarjeta:{
    backgroundColor: '#C9B1FF',
    justifyContent: 'center',
    width: '100%',
    height: 120,
    padding: 10,
    boxShadow: "16px 8px 16px rgba(0, 0, 0, 0.25)",
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 20,
    paddingBottom: 25

  },
});
