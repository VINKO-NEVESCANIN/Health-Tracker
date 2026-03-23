import { router } from 'expo-router';
import { ImageBackground, ScrollView, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

// ✅ IMPORTS DE IMÁGENES
import fondo from '@assets/images/FondoApp.png';
import juan from '@assets/images/JuanPaciente.jpg';
import paciente2 from '@assets/images/Paciente2.jpg';
import paciente3 from '@assets/images/Paciente3.jpeg';
import paciente4 from '@assets/images/PacienteP.jpeg';

export default function GestionarCitas() {

  const items = [
    { id: 1, name: 'Paciente 1', Tepilepsy: 'Tipo de Epilepsia 1', Edad: 25, Image: juan, Tel: '6612345678' },
    { id: 2, name: 'Paciente 2', Tepilepsy: 'Tipo de Epilepsia 2', Edad: 30, Image: paciente2, Tel: '6612344378' },
    { id: 3, name: 'Paciente 3', Tepilepsy: 'Tipo de Epilepsia 3', Edad: 28, Image: paciente3, Tel: '6612321238' },
    { id: 4, name: 'Paciente 4', Tepilepsy: 'Tipo de Epilepsia 4', Edad: 35, Image: paciente4, Tel: '6632324123' },
  ];

  return (
    <ImageBackground
      source={fondo} // ✅ ya no relativa
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
                pathname: '/paciente/EditarCita', // ⚠️ mejor usar ruta absoluta
                params: {
                  condition: '2',
                  id: item.id
                }
              })}
            >
              <Image
                source={item.Image}
                style={styles.foto}
              />
              <Text>{item.name}</Text>
              <Text>{item.Tepilepsy}</Text>
              <Text>{item.Edad}</Text>
              <Text>{item.Tel}</Text>
            </Pressable>
          )}
        />

        <View style={styles.contenedor}></View>

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
    backgroundColor: '#CEB5FF',
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginBottom: 12,
  },
});