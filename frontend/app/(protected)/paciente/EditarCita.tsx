import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  TextInput,
  Button,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

// ✅ IMPORTS CORRECTOS
import fondo from '@assets/images/FondoApp.png';
import juan from '@assets/images/JuanPaciente.jpg';

export default function EditarCita() {

  const params = useLocalSearchParams();
  const condition = params.condition;

  const [texto, setTexto] = useState('');

  // Fecha y Hora
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [showFecha, setShowFecha] = useState(false);
  const [showHora, setShowHora] = useState(false);

  const guardarGestion = () => {
    const datos = { fecha, hora, texto };

    if (condition === '2') {
      router.push('/doctor/GestionarCitas');
    } else {
      router.push('/paciente/Pacientes');
    }

    console.log('Datos guardados:', datos);
  };

  return (
    <ImageBackground
      source={fondo}
      style={styles.fondo}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.contenedor}>

        {/* Paciente */}
        <Pressable
          style={styles.card}
          onPress={() => router.push('/paciente/Pacientes')}
        >
          <Image
            source={juan}
            style={styles.foto}
          />
          <Text>Juan Carlos Albañez Gastelum</Text>
          <Text>Tipo de Epilepsia</Text>
          <Text>25 años</Text>
          <Text>6621234567</Text>
        </Pressable>

        {/* Fecha */}
        <Text>Fecha:</Text>
        <Button
          color='#6631D7'
          title={fecha.toLocaleDateString()}
          onPress={() => setShowFecha(true)}
        />

        <DateTimePickerModal
          isVisible={showFecha}
          mode="date"
          onConfirm={(date) => {
            setFecha(date);
            setShowFecha(false);
          }}
          onCancel={() => setShowFecha(false)}
        />

        {/* Hora */}
        <Text>Hora:</Text>
        <Button
          color='#6631D7'
          title={hora.toLocaleTimeString()}
          onPress={() => setShowHora(true)}
        />

        <DateTimePickerModal
          isVisible={showHora}
          mode="time"
          onConfirm={(date) => {
            setHora(date);
            setShowHora(false);
          }}
          onCancel={() => setShowHora(false)}
        />

        {/* Resumen */}
        <Text>Resumen de la cita:</Text>
        <TextInput
          style={styles.textarea}
          multiline
          numberOfLines={4}
          placeholder="Escribe aquí tu comentario"
          value={texto}
          onChangeText={setTexto}
        />

        <Button
          color='#6631D7'
          title="Guardar Cita"
          onPress={guardarGestion}
        />

      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
  },
  contenedor: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    alignItems: 'flex-start', // ✅ corregido
    backgroundColor: '#CEB5FF',
    padding: 16,
    borderRadius: 12,
    elevation: 4, // ✅ sombra Android
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 20,
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginBottom: 12,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 12,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    width: '100%',
    marginBottom: 16,
  },
});