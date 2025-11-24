import { useState } from 'react';
import { Switch, TextInput,Button, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function EditarPaciente() {

  type Txtinput={
  id: number;
  valor: string;
  };
  // Text de inputs normales

  const Txtinputs: Txtinput[] = [
    { id: 1, valor: 'Nombre' },
    { id: 2, valor: 'Primer Apellido' },
    { id: 3, valor: 'Segundo Apellido' },
    { id: 4, valor: 'Altura' },
    { id: 5, valor: 'Peso' },
  ]

  // 5 inputs normales
  const [inputs, setInputs] = useState(Array(5).fill(''));

  // 2 fechas
  const [fecha1, setFecha1] = useState(new Date());
  const [fecha2, setFecha2] = useState(new Date());
  const [showFecha1, setShowFecha1] = useState(false);
  const [showFecha2, setShowFecha2] = useState(false);

  // 2 selectores
  const [opcion1, setOpcion1] = useState('A');
  const [opcion2, setOpcion2] = useState('X');

  // 7 checkboxes (Switch)
  const [checks, setChecks] = useState(Array(7).fill(false));

  const guardar = () => {
    const datos = {
      inputs,
      fecha1,
      fecha2,
      opcion1,
      opcion2,
      checks,
    };
    console.log('Datos guardados:', datos);
  }
    return (
      <ImageBackground
         source={require('../../assets/FondoApp.png')} // Ruta de tu imagen
            style={styles.fondo}
            resizeMode="cover"
          >
      <ScrollView contentContainerStyle={styles.contenedor}>
      <Text style={styles.titulo}>Editar Usuario</Text>

      {/* 5 inputs normales */}
      {inputs.map((valor, index) => (
        <TextInput
          key={index}
          value={valor}
          onChangeText={(text) => {
            const nuevos = [...inputs];
            nuevos[index] = text;
            setInputs(nuevos);
          }}
          placeholder={`Campo ${index + 1}`}
          placeholderTextColor="#888"
          style={styles.input}
        />
      ))}

      {/* Selector Genero */}
      <Text style={styles.label}>Genero:</Text>
      <Picker selectedValue={opcion1} onValueChange={setOpcion1}>
        <Picker.Item label="Masculino" value="Masculino" />
        <Picker.Item label="Femenino" value="Femenino" />
        <Picker.Item label="Otro" value="Otro" />
      </Picker>

      {/* Fecha 1 */}
      <Text style={styles.label}>Fecha 1: {fecha1.toLocaleDateString()}</Text>
      <Button title="Seleccionar Fecha 1" onPress={() => setShowFecha1(true)} />
      <DateTimePickerModal
        isVisible={showFecha1}
        mode="date"
        onConfirm={(date) => {
          setFecha1(date);
          setShowFecha1(false);
        }}
        onCancel={() => setShowFecha1(false)}
      />

      {/* Fecha 2 */}
      <Text style={styles.label}>Fecha 2: {fecha2.toLocaleDateString()}</Text>
      <Button title="Seleccionar Fecha 2" onPress={() => setShowFecha2(true)} />
      <DateTimePickerModal
        isVisible={showFecha2}
        mode="date"
        onConfirm={(date) => {
          setFecha2(date);
          setShowFecha2(false);
        }}
        onCancel={() => setShowFecha2(false)}
      />
      {/* Selector 1 */}
      <Text style={styles.label}>Opción 2:</Text>
      <Picker selectedValue={opcion2} onValueChange={setOpcion2}>
        <Picker.Item label="Valor X" value="X" />
        <Picker.Item label="Valor Y" value="Y" />
        <Picker.Item label="Valor Z" value="Z" />
      </Picker>

      {/* 7 checkboxes con Switch */}
      <Text style={styles.subtitulo}>Selecciona opciones:</Text>
      {checks.map((valor, index) => (
        <View key={index} style={styles.checkboxContainer}>
          <Switch
            value={valor}
            onValueChange={(nuevo) => {
              const nuevos = [...checks];
              nuevos[index] = nuevo;
              setChecks(nuevos);
            }}
          />
          <Text>Opción {index + 1}</Text>
        </View>
      ))}

      <Button title="Guardar" onPress={guardar} />
    </ScrollView>
      </ImageBackground>
    );
  }


   const styles = StyleSheet.create({

  fondo:{
    flex: 1,
  },

  ListaPacientes:{
    backgroundColor: "#C9B1FF",
    width: 120,
    height: 120,
    boxShadow: "16px 8px 16px rgba(0, 0, 0, 0.25)",
    borderRadius: 20,
    borderWidth: 2,

  },
   pantalla: {
    flex: 1,
    paddingTop: 40,
  },
  contenedor: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  fila: {
    justifyContent: 'space-between',
    marginBottom: 20,
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
  contenedor2: {
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    marginVertical: 10,
  },
  input2: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
    marginBottom: 12,
    elevation: 2,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  }
  

});
