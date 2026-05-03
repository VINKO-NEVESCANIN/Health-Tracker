import { router, useRouter } from "expo-router";
import { useState } from "react";
import { Button } from "react-native";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function VerEpileptograma() {
    const [fecha1, setFecha1] = useState(new Date());
    const [showFecha1, setShowFecha1] = useState(false);
    const [fecha2, setFecha2] = useState(new Date());
    const [showFecha2, setShowFecha2] = useState(false);

    const formatFecha = (date: Date) => {
  const tzOffset = date.getTimezoneOffset() * 60000;
  const localISO = new Date(date.getTime() - tzOffset).toISOString().split("T")[0];
  return localISO;
};

    const handleBuscar = () => {
        // Lógica para buscar el epileptograma entre las dos fechas
        console.log("Buscar entre:", fecha1, "y", fecha2);
        router.push(`../paciente/Epileptograma?fecha1=${formatFecha(fecha1)}&fecha2=${formatFecha(fecha2)}`);
    };

  return (
    <ImageBackground source={require('../../assets/FondoApp.png')} style={{ flex: 1 }}>
      <View style={styles.contenedor}>
        <Text style={styles.title}>Seleccione la Fecha Inicial:</Text>
                <Button color='#6631D7' title={fecha1.toLocaleDateString("es-MX")} onPress={() => setShowFecha1(true)} />
                <DateTimePickerModal
                  isVisible={showFecha1}
                  mode="date"
                  onConfirm={(date) => {
                    const ajustada = new Date(date); 
                    ajustada.setHours(0,0,0,0);
                    setFecha1(ajustada);
                    setShowFecha1(false);
                  }}
                  onCancel={() => setShowFecha1(false)}
                />
                <Text style={styles.title}>Seleccione la Fecha Final:</Text>
                <Button color='#6631D7' title={fecha2.toLocaleDateString("es-MX")} onPress={() => setShowFecha2(true)} />
                <DateTimePickerModal
                  isVisible={showFecha2}
                  mode="date"
                  onConfirm={(date) => {
                    const ajustada = new Date(date);
                    ajustada.setHours(0,0,0,0);
                    setFecha2(ajustada);
                    setShowFecha2(false);
                  }}
                  onCancel={() => setShowFecha2(false)}
                />
                <View style={styles.EspacioArriba}>
                <Button color='#6631D7' title="Buscar" onPress={handleBuscar} />
                </View>
      </View>
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
    height: "15%",
    borderRadius: 10,
    borderWidth: 2,
  },
  checkboxContainers: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  EspacioArriba: {
    marginTop: 16
  }
});
