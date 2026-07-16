import { useState,useEffect } from 'react';
import { Switch, TextInput,Button, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getUserById, updateInfo } from 'services/api';
import { useLocalSearchParams } from 'expo-router';

export default function EditarPaciente() {

  const params = useLocalSearchParams();
  const id = params.id ? Number(params.id) : null;
  const idedit = id;

  useEffect(() => {
  if (id) {
    getUserById(id)
      .then(p => {
        // 👇 llena tus estados con los datos del backend
        setInputs([p.firstName, p.lastName, String(p.height), String(p.weight)]);
        setFecha1(new Date(p.birthdate));
        setFecha2(new Date(p.firstCrisisDate));
        setGenero(p.gender);
        setEpilepsyType(p.epilepsyType);
        setChecks({
          anxiety: p.anxiety,
          migraine: p.migraine,
          addictions: p.addictions,
          hypertension: p.hypertension,
          cogniDisorder: p.cogniDisorder,
          respiDisorder: p.respiDisorder,
      });
      })
      .catch(err => 
        console.error("Error cargando paciente:", err)
      );
  }
}, [id]);

  const labels = ['Nombre', 'Primer Apellido', 'Altura', 'Peso'];

  // 5 inputs normales
  const [inputs, setInputs] = useState(Array(4).fill(''));

  // 2 fechas
  const [fecha1, setFecha1] = useState(new Date());
  const [fecha2, setFecha2] = useState(new Date());
  const [showFecha1, setShowFecha1] = useState(false);
  const [showFecha2, setShowFecha2] = useState(false);

  // 2 selectores
  const [genero, setGenero] = useState('A');
  const [epilepsyType, setEpilepsyType] = useState('X');

  // 7 checkboxes (Switch)
const Checkbox = [
  { key: "anxiety", label: "Ansiedad" },
  { key: "migraine", label: "Migraña" },
  { key: "addictions", label: "Adicciones" },
  { key: "hypertension", label: "Hipertensión" },
  { key: "cogniDisorder", label: "Trastorno cognitivo" },
  { key: "respiDisorder", label: "Trastorno respiratorio" },
];

// Estado inicial como objeto
const [checks, setChecks] = useState<{ [k: string]: boolean }>(
  Object.fromEntries(Checkbox.map(f => [f.key, false]))
);


  const guardar = async () => {
    if (!idedit) {
        alert("ID inválido");
        return;
      }
    const datos = {
      firstName: inputs[0],
      lastName: inputs[1],
      height: inputs[2],
      weight: inputs[3],
      birthdate: fecha1,
      firstCrisisDate: fecha2,
      gender: genero,
      epilepsyType: epilepsyType,
      anxiety: checks.anxiety,
      migraine: checks.migraine,
      addictions: checks.addictions,
      hypertension: checks.hypertension,
      cogniDisorder: checks.cogniDisorder,
      respiDisorder: checks.respiDisorder
    };
    try {
    const paciente = await updateInfo(idedit, datos);
    console.log("Paciente guardado:", paciente);
    alert("Paciente guardado correctamente");
  } catch (err: any) {
    console.error("Error guardando paciente:", err.response?.data || err.message);
    alert("Error al guardar paciente");
  }
  }
    return (
      <ImageBackground
         source={require('../../../assets/images/FondoApp.png')} // Ruta de tu imagen
            style={styles.fondo}
            resizeMode="cover"
          >
      <ScrollView contentContainerStyle={styles.contenedor}>
      <Text style={styles.titulo}>Editar Usuario</Text>

       <View style={styles.contenedor}>
      {labels.map((label, index) => (
        <View key={index} style={styles.item}>
          {/* Texto como label */}
          <Text style={styles.label}>{label}</Text>

          {/* Input asociado */}
          <TextInput
            value={inputs[index]}
            onChangeText={(text) => {
              const nuevos = [...inputs];
              nuevos[index] = text;
              setInputs(nuevos);
            }}
            placeholder={`Escribe ${label}`}
            placeholderTextColor="#888"
            style={styles.input}
          />
        </View>
      ))}
    </View>

      {/* Selector Genero */}
      <Text>Genero:</Text>
      <Picker selectedValue={genero} onValueChange={setGenero}>
        <Picker.Item label="Masculino" value="Masculino" />
        <Picker.Item label="Femenino" value="Femenino" />
        <Picker.Item label="Otro" value="Otro" />
      </Picker>

      {/* Fecha 1 */}
      <Text>Fecha 1: {fecha1.toLocaleDateString()}</Text>
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
      <Text>Fecha 2: {fecha2.toLocaleDateString()}</Text>
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
      <Text>Tipo de epilepsia:</Text>
      <Picker selectedValue={epilepsyType} onValueChange={setEpilepsyType}>
        <Picker.Item label="Valor X" value="X" />
        <Picker.Item label="Valor Y" value="Y" />
        <Picker.Item label="Valor Z" value="Z" />
      </Picker>

      {/* 7 checkboxes con Switch */}
      <Text style={styles.subtitulo}>Selecciona opciones:</Text>
      {Checkbox.map(field => (
        <View key={field.key} style={styles.switchCard}>
          <Text style={styles.switchLabel}>{field.label}</Text>
          <Switch
            value={checks[field.key]}
      onValueChange={(nuevo) =>
        setChecks(prev => ({ ...prev, [field.key]: nuevo }))
      }
      trackColor={{ false: "#ccc", true: "#7B61FF" }}
      thumbColor={checks[field.key] ? "#fff" : "#f4f3f4"}
    />
  </View>
))}



      <Button title="Guardar" onPress={guardar}/>
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

  switchCard: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  padding: 12,
  borderRadius: 10,
  marginBottom: 10,
},

switchLabel: {
  fontSize: 16,
  color: '#000',
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
    width: '95%',
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
  },
  label: {
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 4,
  },
  item: {

  },

});