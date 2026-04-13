import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Alert, Button, ImageBackground, ScrollView, StyleSheet, Text, View} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { getPatientStudies, upsertStudy } from "@/services/api";
import { router } from "expo-router";

export default function EstudiosPrevios() {

    const [NivSericos, setNivSericos] = useState("");
    const [RMNCraneo, setRMNCraneo] = useState("");
    const [Electrocenfalograma, setElectrocenfalograma] = useState("");
    const [FechaNivSericos, setFechaNivSericos] = useState(new Date());
    const [showFechaNivSericos, setShowFechaNivSericos] = useState(false);
    const [FechaEncefalograma, setFechaEncefalograma] = useState(new Date());
    const [showFechaEncefalograma, setShowFechaEncefalograma] = useState(false);
    const [FechaRMNCraneo, setFechaRMNCraneo] = useState(new Date());
    const [showFechaRMNCraneo, setShowFechaRMNCraneo] = useState(false);
    const [estudioId, setEstudioId] = useState<number | null>(null);

    const [patientId, setPatientId] = useState<number | null>(null);
    
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

     useEffect(() => {
       if (patientId) {
         getPatientStudies(patientId)
           .then(p => {
            console.log("Datos que llegan del backend:", p);
             setEstudioId(p.id);
             setNivSericos(p.resNSMAP || "No realizado");
             setRMNCraneo(p.resRMNC || "No realizado");
             setElectrocenfalograma(p.resEEG || "No realizado");
             setFechaNivSericos(new Date(p.dateNSMAP));
             setFechaEncefalograma(new Date(p.dateEEG));
             setFechaRMNCraneo(new Date(p.dateRMNC));
           })
           .catch(err => console.error("Error cargando estudios:", err));
       }
     
     }, [patientId]);

    const guardar = async () => {
      try {
        const patientStudies = {
          id: estudioId,
          patientId: patientId,
          resNSMAP: NivSericos,
          resRMNC: RMNCraneo,
          resEEG: Electrocenfalograma,
          dateNSMAP: FechaNivSericos.toISOString(),
          dateEEG: FechaEncefalograma.toISOString(),
          dateRMNC: FechaRMNCraneo.toISOString()
        };

        console.log("Datos que manda a prisma:", patientStudies);
        const response = await upsertStudy(patientStudies);
        console.log("Respuesta del servidor:", response);

        alert("Estudios guardados correctamente");
               router.push("/paciente/MenuPaciente"); // Navega a la pantalla anterior después de guardar
      } catch (error) {
        alert("Error al guardar los estudios");
        console.error("Error al guardar los estudios:", error);
        }
    };

    const alertConfirm = () => {
      Alert.alert("Estas seguro de que deseas guardar esta información?", "", [
        { text: "Cancelar", style: "cancel" },
        { text: "Aceptar", onPress: guardar },
      ], { cancelable: true });
    };

    const Resultado = [
        { label: "No Realizado", value: "No Realizado" },
        { label: "Anormal", value: "Anormal" },
        { label: "Normal", value: "Normal" },
    ];
  return (
    <ImageBackground
      source={require("../../assets/FondoApp.png")}
      style={{ flex: 1}}
    >
     <ScrollView style={styles.contenedor}>
        <Text style={styles.title}>Niveles Sericos:</Text>
        <Picker
          selectedValue={NivSericos}
          onValueChange={(val) => setNivSericos(val)}
          style={styles.pickers}
        >
          {Resultado.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>

          <Text style={styles.title}>Fecha de Niveles Sericos:</Text>
          <Button color='#6631D7' title={FechaNivSericos.toLocaleDateString()} onPress={() => setShowFechaNivSericos(true)} />
        <DateTimePickerModal
          isVisible={showFechaNivSericos}
          mode="date"
          onConfirm={(date) => {
            setFechaNivSericos(date);
            setShowFechaNivSericos(false);
          }}
          onCancel={() => setShowFechaNivSericos(false)}
        />

        <Text style={styles.title}>Resonancia Magnetica Nuclear de Cráneo:</Text>
        <Picker
          selectedValue={RMNCraneo}
          onValueChange={(val) => setRMNCraneo(val)}
          style={styles.pickers}
        >
          {Resultado.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>

         <Text style={styles.title}>Fecha de Resonancia Magnetica Nuclear:</Text>
        <Button color='#6631D7' title={FechaRMNCraneo.toLocaleDateString()} onPress={() => setShowFechaRMNCraneo(true)} />
        <DateTimePickerModal
          isVisible={showFechaRMNCraneo}
          mode="date"
          onConfirm={(date) => {
            setFechaRMNCraneo(date);
            setShowFechaRMNCraneo(false);
          }}
          onCancel={() => setShowFechaRMNCraneo(false)}
        />

        <Text style={styles.title}>Electroencefalograma:</Text>
        <Picker
          selectedValue={Electrocenfalograma}
          onValueChange={(val) => setElectrocenfalograma(val)}
          style={styles.pickers}
        >
          {Resultado.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>

        <Text style={styles.title}>Fecha de Electroencefalograma:</Text>
        <Button color='#6631D7' title={FechaEncefalograma.toLocaleDateString()} onPress={() => setShowFechaEncefalograma(true)} />
        <DateTimePickerModal
          isVisible={showFechaEncefalograma}
          mode="date"
          onConfirm={(date) => {
            setFechaEncefalograma(date);
            setShowFechaEncefalograma(false);
          }}
          onCancel={() => setShowFechaEncefalograma(false)}
        />
    <View style={styles.botonesContainer}>
        <Button color='#6631D7' title="Guardar" onPress={alertConfirm} />
       
    </View>

    <View style={styles.botonesContainer}>
        <Button color='white' title="Cancelar" onPress={router.back} />
    </View>

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
    paddingBottom: 10,
  },
  botonesContainer: {
   paddingBottom: 10,
   paddingTop: 10,
  },

  pickers:{
    backgroundColor: "white",
    width: "100%",
    borderRadius: 10,
    borderWidth: 2,
  }
});
