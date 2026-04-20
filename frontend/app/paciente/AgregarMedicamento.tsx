import { createPatientMedication, getMedications } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Button } from "react-native";
import {StyleSheet, ImageBackground, Text, View, ScrollView } from "react-native";

export default function AgregarMedicamento() {

  useEffect(() => {
    getMedications()
      .then(data => {
        console.log("Medicamentos recibidos:", data);
        setMedications(Array.isArray(data) ? data : data?.medications ?? []);
      })
      .catch(err => {
        console.error("Error cargando medicamentos:", err.response?.data || err.message);
      });
  }, []);

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

    const [Gramaje, setGramaje] = useState("");
    const [Medications, setMedications] = useState<any[]>([]);
    const [selectMeds, setSelectMeds] = useState<number>(0);
    const [Presentacion, setPresentacion] = useState("");
    const [Frecuencia, setFrecuencia] = useState("");
    const nombreMedicamento = Medications.find(item => item.id === selectMeds)?.name;
    const [patientId, setPatientId] = useState<number | null>(null);

    const Presentaciones = [
      { label: "Tabletas", value: "Tabletas" },
      { label: "Jarabe", value: "Jarabe" },
      { label: "Inyecciones", value: "Inyecciones" },
      { label: "Capsulas", value: "Capsulas" },
    ];
  
    const Pastillas = Array.from({ length: 23 }, (_, i) => {
      if(Presentacion === "Tabletas" || Presentacion === "Capsulas" || Presentacion === ""){
      const valor = (i + 1) * 50;
      return {
        label: `${valor} Mg`,
        value: `${valor}`,
      };
    }else{
       const valor = (i + 1) * 50;
      return {
        label: `${valor} Ml`,
        value: `${valor}`,
      };
    }
    });

  const Frecuencias = [
    { label: "6 Horas", value: 6 },
    { label: "8 Horas", value: 8 },
    { label: "12 Horas", value: 12 },
    { label: "24 Horas", value: 24 },
  ];

  const AgregarMedAPaciente = async () => {
    try{
      const datos = await createPatientMedication({
        patientId: patientId,
        medicationId: selectMeds,
        dose: Gramaje.toString(),
        interval: Frecuencia.toString(),
        name: nombreMedicamento,
        presentation: Presentacion,
      });
      router.push("/paciente/MisMedicamentos");
      console.log("Datos guardados:", datos);
    }catch (error) {
      console.error("Error guardando datos:", error);
    }
  };


  return (
    <ImageBackground source={require("../../assets/FondoApp.png")} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.contenedor}>

        <Text style={styles.title}>Medicamento:</Text>
                <Picker 
                style={[styles.pickers, { marginBottom: 12 }]} 
                selectedValue={selectMeds} 
                onValueChange={(val) => setSelectMeds(Number(val))}>          
                <Picker.Item label="Selecciona un medicamento" value={0} />      
                {Medications.map((item) => (
                    <Picker.Item 
                    key={item.id} 
                    label={item.name} 
                    value={item.id} />
                  ))}
                </Picker>

        <Text style={styles.title}>Presentacion:</Text>
                <Picker style={[styles.pickers, { marginBottom: 12 }]} 
                selectedValue={Presentacion} 
                onValueChange={(val) => setPresentacion(val)}>    
                <Picker.Item label="Selecciona una presentación" value={0} />            
                {Presentaciones.map((item) => (
                    <Picker.Item 
                    key={item.value}
                    label={item.label} 
                    value={item.value} />
                  ))}
                </Picker>

        <Text style={styles.title}>Gramaje de Medicamento:</Text>
                <Picker style={[styles.pickers, { marginBottom: 12 }]} 
                selectedValue={Gramaje} 
                onValueChange={(val) => setGramaje(Number(val))}>
                  <Picker.Item label="Seleccione el gramaje" value={0} />  
                  {Pastillas.map((item) => (
                    <Picker.Item 
                    key={item.value} 
                    label={item.label} 
                    value={item.value} />
                  ))}
                </Picker>
        
        <Text style={styles.title}>Frecuencia:</Text>
                <Picker style={[styles.pickers, { marginBottom: 12 }]} 
                selectedValue={Frecuencia} 
                onValueChange={(val) => setFrecuencia(val)}> 
                <Picker.Item label="Seleccione la frecuencia" value={0} />                 
                {Frecuencias.map((item) => (
                    <Picker.Item 
                    key={item.value} 
                    label={item.label} 
                    value={item.value} />
                  ))}
                </Picker>
      
      <View style={styles.Tarjeta}>
        <Text style={styles.title}>Resumen del Medicamento:</Text>
        <Text>Medicamento: {nombreMedicamento || "Ninguno Seleccionado"}</Text>
        <Text>
           {Presentacion && Gramaje && Frecuencia && nombreMedicamento
          ? (Presentacion === "Tabletas" || Presentacion === "Capsulas" 
          ? `Dosis Total por dia: ${(24 / Frecuencia) * Gramaje} Mg al Día \n`
          : `Dosis Total por dia: ${(24 / Frecuencia) * Gramaje} Ml al Día \n`) 
          : ""}
          </Text>

        <Text>
          {Presentacion && Gramaje && Frecuencia && nombreMedicamento
          ? (Presentacion === "Tabletas" || Presentacion === "Capsulas"
          ? `Su dosis será: ${Gramaje} Mg cada ${Frecuencia} horas de ${nombreMedicamento}`
          : `Su dosis será: ${Gramaje} Ml cada ${Frecuencia} horas de ${nombreMedicamento}`)
          : ""}
        </Text>
      </View>

     <Button color='#6631D7' title="Guardar" onPress={AgregarMedAPaciente} />

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
