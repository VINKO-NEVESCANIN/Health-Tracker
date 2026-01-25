import { router } from 'expo-router';
import {ImageBackground, ScrollView, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default function GestionarCitas() {

   const items = [
  { id: 1, name: 'Paciente 1', Tepilepsy: 'Tipo de Epilepsia 1', Edad: 25, Image: require('../Icon/JuanPaciente.jpg'), Tel: '6612345678' },
  { id: 2, name: 'Paciente 2', Tepilepsy: 'Tipo de Epilepsia 2', Edad: 30, Image: require('../Icon/Paciente2.jpg'), Tel: '6612344378'  },
  { id: 3, name: 'Paciente 3', Tepilepsy: 'Tipo de Epilepsia 3', Edad: 28, Image: require('../Icon/Paciente3.jpeg'), Tel: '6612321238'  },
  { id: 4, name: 'Paciente 4', Tepilepsy: 'Tipo de Epilepsia 4', Edad: 35, Image: require('../Icon/PacienteP.jpeg'), Tel: '6632324123'  },
  ]
  
    return (
      <ImageBackground
         source={require('../../assets/FondoApp.png')} // Ruta de tu imagen
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
        pathname: '../../paciente/EditarCita',
        params: { condition: '2',
          id: item.id
         }
        })}>
        <Image 
          source={item.Image} // Ruta de la imagen de perfil
          style={styles.foto}
        /> 
        <Text>{item.name}</Text>
        <Text>{item.Tepilepsy}</Text>
        <Text>{item.Edad}</Text>
        <Text>{item.Tel}</Text>
        </Pressable>
  )}
      />

       <View style={styles.contenedor}>
      
    </View>

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
