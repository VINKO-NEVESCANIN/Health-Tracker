import { router } from 'expo-router';
import { ImageBackground, ScrollView, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

// ✅ IMPORTS
import fondo from '@assets/images/FondoApp.png';
import juan from '@assets/images/JuanPaciente.jpg';
import paciente2 from '@assets/images/Paciente2.jpg';
import paciente3 from '@assets/images/Paciente3.jpeg';
import paciente4 from '@assets/images/PacienteP.jpeg';

export default function MisCitas() {

  const items = [
    { id: 1, name: 'Doctor 1', Fecha: '04-01-2026', Hora: '12:30 PM', Image: juan, Resumen: 'Resumen de la Cita' },
    { id: 2, name: 'Doctor 2', Fecha: '12-01-2026', Hora: '02:00 PM', Image: paciente2, Resumen: 'Resumen de la Cita' },
    { id: 3, name: 'Doctor 3', Fecha: '26-01-2026', Hora: '04:30 PM', Image: paciente3, Resumen: 'Resumen de la Cita' },
    { id: 4, name: 'Doctor 4', Fecha: '02-02-2026', Hora: '07:00 PM', Image: paciente4, Resumen: 'Resumen de la Cita' },
  ];

  return (
    <ImageBackground
      source={fondo}
      style={styles.fondo}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.contenedor}>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.contenedor}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => router.push({
                pathname: '/paciente/EditarCita', // ✅ absoluta
                params: {
                  condition: '2',
                  id: item.id
                }
              })}
            >
              <Image source={item.Image} style={styles.foto} />
              <Text>{item.name}</Text>
              <Text>{item.Fecha}</Text>
              <Text>{item.Hora}</Text>
              <Text>{item.Resumen}</Text>
            </Pressable>
          )}
        />

        <View style={styles.contenedor}></View>

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
    alignItems: 'flex-start',
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
