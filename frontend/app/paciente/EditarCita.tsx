import { router } from 'expo-router';
import { useState } from 'react';
import {TextInput,Button, ImageBackground, ScrollView, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function EditarPaciente() {

  const [texto, setTexto] = useState('');

  // Fecha y Hora
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [showFecha, setShowFecha] = useState(false);
  const [showHora, setShowHora] = useState(false);
  
  const guardar = () => {
    const datos = {
      fecha,
      hora,
      texto,
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
      <View style>
        <Pressable 
        style={styles.card}
        onPress={() => router.push({
        pathname: '../../paciente/Pacientes',
        params: { condition: '1' }
        })}>
        <Image 
          source={require('../Icon/JuanPaciente.jpg')} // Ruta de la imagen de perfil
          style={styles.foto}
        /> 
        <Text>Juan Carlos Albañez Gastelum</Text>
        <Text>Tipo de Epilepsia</Text>
        <Text>25 años</Text>
        <Text>6621234567</Text>
        </Pressable>
      </View>

       <View style={styles.contenedor}>
      
    </View>

      {/* Fecha */}
      <Text>Fecha:</Text>
      <Button color='#6631D7' title={fecha.toLocaleDateString()} onPress={() => setShowFecha(true)} />
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
      <Button color='#6631D7' title={hora.toLocaleTimeString()} onPress={() => setShowHora(true)} />
      <DateTimePickerModal
        isVisible={showHora}
        mode="time"
        onConfirm={(date) => {
          setHora(date);
          setShowHora(false);
        }}
        onCancel={() => setShowHora(false)}
      />
      {/* Resumen de la cita */}
      <Text>Resumen de la cita:</Text>
      <TextInput
     style={styles.textarea}
      multiline={true}
      numberOfLines={4}
      placeholder="Escribe aquí tu comentario"
      value={texto}
     onChangeText={setTexto}
      />  

      <Button color='#6631D7' title="Editar Cita" onPress={guardar} />
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
    width: '95%',
  },
textarea: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 12,
    textAlignVertical: 'top', // asegura que el texto empiece arriba
    backgroundColor: '#fff',
    width: '100%',
    alignSelf: 'center',
    marginBottom: 16,
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
  label: {
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 4,
  },
  card: {
    alignItems: 'left',
    backgroundColor: '#CEB5FF',
    padding: 16,
    borderRadius: 12,
    elevation: 4, // sombra en Android
    shadowColor: '#000', // sombra en iOS
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 2,
    marginTop: 10,
    
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: 60, // círculo
    marginBottom: 12,
  },

});
