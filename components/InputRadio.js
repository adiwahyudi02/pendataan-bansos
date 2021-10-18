import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import Errormessage from "./ErrorMessage";
import Label from "./Label";

const InputRadio = (props) => {
  const { label, description, name, options, inlineStyle, textStyle, rest } =
    props;
  const { handleChange, values, errors, touched } = rest;

  const changeValue = (item) => {
    let value = item.value ? item.value.toString() : item.toString();
    handleChange(name)(value.toString());
  };

  return (
    <View style={styles.container}>
      <Label
        label={label}
        description={description}
        isError={errors[name] && touched[name]}
      />
      <Errormessage
        isError={errors[name] && touched[name]}
        message={errors[name]}
      />

      <View style={inlineStyle && styles.inline}>
        {options.map((item) => (
          <TouchableWithoutFeedback
            key={!item.value ? item : item.value}
            onPress={() => changeValue(item)}
          >
            <View
              style={[
                styles.radioContainer,
                inlineStyle ? { width: "40%" } : { width: "100%" },
              ]}
            >
              <View
                style={[
                  styles.radioOutline,
                  values[name] === (!item.value ? item : item.value) &&
                    styles.radioOutlineActive,
                ]}
              >
                <View
                  style={[
                    styles.radioInner,
                    values[name] === (!item.value ? item : item.value) &&
                      styles.radioInnerActive,
                  ]}
                ></View>
              </View>
              <Text style={textStyle}>{!item.text ? item : item.text}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
  },
  inline: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  radioOutline: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: "#9e9e9e",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioOutlineActive: {
    borderColor: "#069550",
  },
  radioInner: {
    width: 12,
    height: 12,
  },
  radioInnerActive: {
    borderRadius: 100,
    backgroundColor: "#069550",
  },
});

export default InputRadio;
