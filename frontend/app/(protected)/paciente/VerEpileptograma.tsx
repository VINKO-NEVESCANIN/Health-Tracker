import { useState } from "react";
import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import fondo from '@assets/images/FondoApp.png';

export default function VerEpileptograma() {
  const [fecha1, setFecha1] = useState(new Date());
  const [showFecha1, setShowFecha1] = useState(false);
  const [fecha2, setFecha2] = useState(new Date());
  const [showFecha2, setShowFecha2] = useState(false);

  return (
    <ImageBackground source={fondo} style={{ flex: 1 }}>
      <View style={styles.contenedor}>
        <Text style={styles.title}>Seleccione la Fecha Inicial:</Text>

        <Button
          color='#6631D7'
          title={fecha1.toLocaleDateString()}
          onPress={() => setShowFecha1(true)}
        />

        <DateTimePickerModal
          isVisible={showFecha1}
          mode="date"
          onConfirm={(date) => {
            setFecha1(date);
            setShowFecha1(false);
          }}
          onCancel={() => setShowFecha1(false)}
        />

        <Text style={styles.title}>Seleccione la Fecha Final:</Text>

        <Button
          color='#6631D7'
          title={fecha2.toLocaleDateString()}
          onPress={() => setShowFecha2(true)}
        />

        <DateTimePickerModal
          isVisible={showFecha2}
          mode="date"
          onConfirm={(date) => {
            setFecha2(date);
            setShowFecha2(false);
          }}
          onCancel={() => setShowFecha2(false)}
        />

        <View style={styles.EspacioArriba}>
          <Button color='#6631D7' title="Buscar" onPress={() => {}} />
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
