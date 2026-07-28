import { router } from 'expo-router';
import { ImageBackground, StyleSheet, Text, Image, Pressable, FlatList } from 'react-native';

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
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.contenedor}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push({
              pathname: '/(protected)/paciente/EditarCita',
              params: {
                condition: '1',
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: { flex: 1 },
  contenedor: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 16,
  },
  card: {
    alignItems: 'flex-start',
    backgroundColor: '#CEB5FF',
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 2,
    marginTop: 10,
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginBottom: 12,
  },
});
