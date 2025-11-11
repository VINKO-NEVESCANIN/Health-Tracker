import { ImageBackground, StyleSheet, Text, View } from 'react-native';


export default function EditarPaciente() {
    return (
      <ImageBackground
         source={require('../../assets/FondoApp.png')} // Ruta de tu imagen
            style={styles.fondo}
            resizeMode="cover"
          >
      <View style={styles.container}>
        <Text>Editar Paciente Screen</Text>
      </View>
      </ImageBackground>
    );
  }

    const styles = StyleSheet.create({
        fondo :{
            flex: 1,
          },
        });