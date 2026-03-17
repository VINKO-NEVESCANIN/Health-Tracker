import { router } from 'expo-router'
import { ImageBackground, StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native'

import fondo from '@/assets/images/FondoApp.png'

import paciente1 from '@/app/Icon/JuanPaciente.jpg'
import paciente2 from '@/app/Icon/Paciente2.jpg'
import paciente3 from '@/app/Icon/Paciente3.jpeg'
import paciente4 from '@/app/Icon/PacienteP.jpeg'

export default function GestionarCitas() {

  const items = [
    { id: 1, name: 'Paciente 1', Tepilepsy: 'Tipo de Epilepsia 1', Edad: 25, Image: paciente1, Tel: '6612345678' },
    { id: 2, name: 'Paciente 2', Tepilepsy: 'Tipo de Epilepsia 2', Edad: 30, Image: paciente2, Tel: '6612344378' },
    { id: 3, name: 'Paciente 3', Tepilepsy: 'Tipo de Epilepsia 3', Edad: 28, Image: paciente3, Tel: '6612321238' },
    { id: 4, name: 'Paciente 4', Tepilepsy: 'Tipo de Epilepsia 4', Edad: 35, Image: paciente4, Tel: '6632324123' },
  ]

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
              pathname: '../../paciente/EditarCita',
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

            <Text style={styles.nombre}>{item.name}</Text>
            <Text>{item.Tepilepsy}</Text>
            <Text>Edad: {item.Edad}</Text>
            <Text>Tel: {item.Tel}</Text>

          </Pressable>
        )}
      />

    </ImageBackground>
  )
}

const styles = StyleSheet.create({

  fondo: {
    flex: 1,
  },

  contenedor: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 20,
  },

  card: {
    alignItems: 'flex-start',
    backgroundColor: '#CEB5FF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 12,

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 4,
  },

  foto: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginBottom: 12,
  },

  nombre: {
    fontWeight: 'bold',
    fontSize: 16
  }

})