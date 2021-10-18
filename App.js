import React from "react";
import { StyleSheet, SafeAreaView, StatusBar, View } from "react-native";
import Formulir from "./screens/Formulir";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Formulir />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
  },
});
