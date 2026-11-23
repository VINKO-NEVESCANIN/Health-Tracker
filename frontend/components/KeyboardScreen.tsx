import React from "react";
import { KeyboardAvoidingView, ScrollView, ScrollViewProps, StyleSheet } from "react-native";

// ScrollView que se levanta cuando aparece el teclado, para que lo que se escribe siempre se vea.
// Con Android edge-to-edge (Expo SDK 54+) el sistema ya no redimensiona la ventana,
// por eso se usa KeyboardAvoidingView con "padding" en ambas plataformas.
export default function KeyboardScreen({ children, ...props }: ScrollViewProps) {
  return (
    <KeyboardAvoidingView style={styles.flex} behavior="padding">
      <ScrollView keyboardShouldPersistTaps="handled" {...props}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({ flex: { flex: 1 } });
