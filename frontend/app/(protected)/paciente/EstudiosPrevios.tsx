import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Button, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

// ✅ IMPORT CORRECTO
import fondo from '@assets/images/FondoApp.png';

export default function EstudiosPrevios() {

  const [NivSericos, setNivSericos] = useState("");
  const [RMNCraneo, setRMNCraneo] = useState("");
  const [Electrocenfalograma, setElectrocenfalograma] = useState("");

  const [FechaNivSericos, setFechaNivSericos] = useState(new Date());
  const [showFechaNivSericos, setShowFechaNivSericos] = useState(false);

  const [FechaEncefalograma, setFechaEncefalograma] = useState(new Date());
  const [showFechaEncefalograma, setShowFechaEncefalograma] = useState(false);

  const Resultado = [
    { label: "No Realizado", value: "No Realizado" },
    { label: "Anormal", value: "Anormal" },
    { label: "Normal", value: "Normal" },
  ];

  return (
    <ImageBackground
      source={fondo} // ✅ FIX
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.contenedor}>

        <Text style={styles.title}>Niveles Séricos:</Text>
        <Picker
          selectedValue={NivSericos}
          onValueChange={(val) => setNivSericos(val)}
          style={styles.pickers}
        >
          {Resultado.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>

        <Text style={styles.title}>Fecha de Niveles Séricos:</Text>
        <Button
          color='#6631D7'
          title={FechaNivSericos.toLocaleDateString()}
          onPress={() => setShowFechaNivSericos(true)}
        />

        <DateTimePicker
          isVisible={showFechaNivSericos} // ✅ FIX
          mode="date"
          onConfirm={(date) => {
            setFechaNivSericos(date);
            setShowFechaNivSericos(false);
          }}
          onCancel={() => setShowFechaNivSericos(false)}
        />

        <Text style={styles.title}>RMN de Cráneo:</Text>
        <Picker
          selectedValue={RMNCraneo}
          onValueChange={(val) => setRMNCraneo(val)}
          style={styles.pickers}
        >
          {Resultado.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>

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
        <Button
          color='#6631D7'
          title={FechaEncefalograma.toLocaleDateString()}
          onPress={() => setShowFechaEncefalograma(true)}
        />

        <DateTimePicker
          isVisible={showFechaEncefalograma} // ✅ FIX
          mode="date"
          onConfirm={(date) => {
            setFechaEncefalograma(date);
            setShowFechaEncefalograma(false);
          }}
          onCancel={() => setShowFechaEncefalograma(false)}
        />

        <View style={styles.botonesContainer}>
          <Button color='#6631D7' title="Guardar" onPress={() => {}} />
        </View>

        <View style={styles.botonesContainer}>
          <Button color='white' title="Cancelar" onPress={() => {}} />
        </View>

      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    paddingHorizontal: 16,
    paddingBottom: 20
  },

  title: {
    fontSize: 18,
    marginVertical: 10
  },

  botonesContainer: {
    paddingBottom: 10,
    paddingTop: 10
  },

  pickers: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 10,
    borderWidth: 2
  }
});