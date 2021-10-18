import React from "react";
import { StyleSheet, View } from "react-native";

const Overlay = (props) => {
  return <View style={styles.overlay}>{props.children}</View>;
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.9,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Overlay;
