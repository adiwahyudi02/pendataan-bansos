import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Errormessage = (props) => {
  const { isError, message } = props;
  return (
    <View>{isError && <Text style={styles.errorMessage}>{message}</Text>}</View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    color: "#D32F2F",
    fontSize: 13,
  },
});

export default Errormessage;
