import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = (props) => {
  const { title, variant, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        variant === "primary" && styles.primary,
        variant === "secondary" && styles.secondary,
        variant === "tertiary" && styles.tertiary,
      ]}
    >
      <Text
        style={[
          styles.text,
          variant === "primary" && styles.textPrimary,
          variant === "secondary" && styles.textSecondary,
          variant === "tertiary" && styles.textTertiary,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 8,
    marginVertical: 20,
    backgroundColor: "lightgray",
  },
  text: {
    fontSize: 14,
    fontWeight: "700",
  },
  primary: {
    backgroundColor: "#008444",
  },
  textPrimary: {
    color: "white",
  },
  secondary: {
    borderWidth: 1,
    borderColor: "#008444",
    backgroundColor: "transparent",
  },
  textSecondary: {
    color: "#008444",
  },
  tertiary: {
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  textTertiary: {
    color: "#008444",
  },
});

export default Button;
