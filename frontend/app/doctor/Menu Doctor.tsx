import React from "react";
import {Image, Pressable, Text, Button, StyleSheet,View} from "react-native";

export default function MenuDoctor() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.StylePress} onPress={() => console.log("Logo presionado")}>
        <Image source={require("../Icon/LoginIcon.png")} style={{ width: 100, height: 100, marginBottom: 20 }} />
        
      </Pressable>
        </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
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
  itemText: { fontWeight: "bold" },

  BtnGestionCita:{

  },

  BtnPacientes:{

  },

  BtnRecentCrysis:{

  },

  BtnEpileptoGram:{

  },

  StylePress:{
    backgroundColor: "#000000ff",
    width: 100,
    height: 100,

  }
});
