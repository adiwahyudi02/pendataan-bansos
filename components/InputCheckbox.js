import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Label from "./Label";
import Errormessage from "./ErrorMessage";

const InputCheckBox = (props) => {
  const { label, description, name, options, inlineStyle, textStyle, rest } =
    props;
  const { setFieldValue, values, errors, touched } = rest;

  const changeValue = (item) => {
    let result = [...values[name]];

    item.value
      ? result.indexOf(item.value) === -1
        ? result.push(item.value)
        : result.splice(result.indexOf(item.value), 1)
      : result.indexOf(item) === -1
      ? result.push(item)
      : result.splice(result.indexOf(item), 1);

    setFieldValue(name, result);
  };

  return (
    <View style={styles.container}>
      {label && (
        <Label
          label={label}
          description={description}
          isError={errors[name] && touched[name]}
        />
      )}

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
                styles.checkboxContainer,
                inlineStyle ? { width: "40%" } : { width: "100%" },
              ]}
            >
              <View
                style={[
                  styles.checkbox,
                  values[name].indexOf(!item.value ? item : item.value) !==
                    -1 && styles.checkboxActive,
                ]}
              >
                {values[name].indexOf(!item.value ? item : item.value) !==
                  -1 && <FontAwesome name="check" size={15} color="#fff" />}
              </View>
              <Text style={[styles.checkboxText, textStyle]}>
                {!item.text ? item : item.text}
              </Text>
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 4,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: "#9e9e9e",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxActive: {
    backgroundColor: "#069550",
    borderColor: "#069550",
  },
  checkboxText: {
    width: "90%",
  },
});

export default InputCheckBox;
