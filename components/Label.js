import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Label = (props) => {
  const { label, description, isError } = props;
  return (
    <View>
      <Text style={[styles.label, isError && styles.labelError]}>{label}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "#424242",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
  },
  labelError: {
    color: "#D32F2F",
  },
  description: {
    color: "#616161",
    fontSize: 13,
    marginBottom: 4,
  },
});

export default Label;
