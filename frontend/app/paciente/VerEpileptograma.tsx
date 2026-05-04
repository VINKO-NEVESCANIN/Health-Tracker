import { router, useRouter } from "expo-router";
import { useState } from "react";
import { Button } from "react-native";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function VerEpileptograma() {
    const [startDate, setStartDate] = useState(new Date());
    const [showStartDate, setShowStartDate] = useState(false);
    const [endDate, setEndDate] = useState(new Date());
    const [showEndDate, setShowEndDate] = useState(false);

    const formatFecha = (date: Date) => {
  const tzOffset = date.getTimezoneOffset() * 60000;
  const localISO = new Date(date.getTime() - tzOffset).toISOString().split("T")[0];
  return localISO;
};

    const handleBuscar = () => {
        // Lógica para buscar el epileptograma entre las dos fechas
        console.log("Buscar entre:", startDate, "y", endDate);
        router.push(`../paciente/Epileptograma?startDate=${formatFecha(startDate)}&endDate=${formatFecha(endDate)}`);
    };

  return (
    <ImageBackground source={require('../../assets/FondoApp.png')} style={{ flex: 1 }}>
      <View style={styles.contenedor}>
        <Text style={styles.title}>Seleccione la Fecha Inicial:</Text>
                <Button color='#6631D7' title={startDate.toLocaleDateString("es-MX")} onPress={() => setShowStartDate(true)} />
                <DateTimePickerModal
                  isVisible={showStartDate}
                  mode="date"
                  onConfirm={(date) => {
                    const ajustada = new Date(date); 
                    ajustada.setHours(0,0,0,0);
                    setStartDate(ajustada);
                    setShowStartDate(false);
                  }}
                  onCancel={() => setShowStartDate(false)}
                />
                <Text style={styles.title}>Seleccione la Fecha Final:</Text>
                <Button color='#6631D7' title={endDate.toLocaleDateString("es-MX")} onPress={() => setShowEndDate(true)} />
                <DateTimePickerModal
                  isVisible={showEndDate}
                  mode="date"
                  onConfirm={(date) => {
                    const ajustada = new Date(date);
                    ajustada.setHours(0,0,0,0);
                    setEndDate(ajustada);
                    setShowEndDate(false);
                  }}
                  onCancel={() => setShowEndDate(false)}
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
