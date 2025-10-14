import React from "react";
import {Image, Pressable, Text, Button, StyleSheet,View, Animated} from "react-native";

export default function MenuDoctor() {
  return (
    <View style={styles.container}>
      {Array.from({ length: 2 }).map((_, i) => (
      <Pressable style={styles.StylePress} onPress={() => console.log("Logo presionado")}>
        <Image 
        source={require("../Icon/LoginIcon.png")} 
        style={styles.BtnGestionCita}
        />
        <Text style={styles.itemText}>Gestion Cita</Text>
      </Pressable>
      ))}      
      <Pressable style={styles.StylePress} onPress={() => console.log("Logo presionado")}>
        <Image 
        source={require("../Icon/LoginIcon.png")} 
        style={styles.BtnGestionCita}
        />
        <Text style={styles.itemText}>Gestion Cita</Text>
      </Pressable>
              
        </View>
        

    
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50,  flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        padding: 10, },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#000000ff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemText: { 
    fontWeight: "bold", 
    marginTop: 97,
    marginLeft: 20,
    position: 'absolute',
    
  },

  BtnGestionCita:{
     width: 100, 
     height: 100,
     marginBottom: 20,
     alignSelf: 'center',
     borderRadius: 20,
  },

  BtnPacientes:{

  },

  BtnRecentCrysis:{

  },

  BtnEpileptoGram:{

  },

  StylePress:{
    backgroundColor: "#C9B1FF",
    width: 120,
    height: 120,
    boxShadow: "16px 8px 16px rgba(0, 0, 0, 0.25)",
    borderRadius: 20,
    border: '2px solid black'
    
  }
});
