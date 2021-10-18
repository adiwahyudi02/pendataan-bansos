import React, { useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TextInput, Text, View } from "react-native";
import Label from "./Label";
import Errormessage from "./ErrorMessage";

const InputText = (props) => {
  const {
    label,
    description,
    name,
    placeholder,
    keyboardType,
    prefix,
    suffix,
    formating,
    multiline,
    numberOfLines,
    rest,
  } = props;
  const { setFieldValue, handleBlur, values, errors, touched } = rest;
  const [isFocus, setIsFocus] = useState(false);

  const blurHandler = (e) => {
    setIsFocus(false);
    handleBlur(name)(e);
  };

  return (
    <View style={styles.container}>
      <Label
        label={label}
        description={description}
        isError={errors[name] && touched[name]}
      />
      <View
        style={[
          styles.borderInput1,
          isFocus && styles.borderInputFocus1,
          errors[name] && touched[name] && styles.borderInputError,
        ]}
      >
        <View
          style={[
            styles.borderInput2,
            isFocus && styles.borderInputFocus2,
            errors[name] && touched[name] && styles.borderInput2,
          ]}
        >
          {prefix && (
            <View style={styles.prefixContainer}>
              <Text>{prefix}</Text>
            </View>
          )}
          <TextInput
            onChangeText={(e) => {
              setFieldValue(name, formating ? formating(e) : e);
            }}
            onChange={(args) => {
              return {
                value: args.nativeEvent.text,
              };
            }}
            onBlur={(e) => blurHandler(e)}
            onFocus={() => setIsFocus(true)}
            onPressOut={() => setIsFocus(false)}
            value={values[name].toString()}
            placeholder={placeholder}
            keyboardType={keyboardType}
            multiline={multiline}
            numberOfLines={numberOfLines}
            style={styles.input}
          />
          {suffix && (
            <View style={styles.suffixContainer}>
              <Text>{suffix}</Text>
            </View>
          )}
        </View>
      </View>
      <Errormessage
        isError={errors[name] && touched[name]}
        message={errors[name]}
      />
    </View>
  );
};

InputText.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  rest: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
  },
  borderInput1: {
    width: "100%",
    borderRadius: 8,
    borderColor: "#757575",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  borderInputFocus1: {
    borderColor: "#069550",
  },
  borderInput2: {
    width: "100%",
    borderRadius: 7,
    borderColor: "transparent",
    borderWidth: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  borderInputFocus2: {
    borderWidth: 1,
    borderColor: "#ffb900",
  },
  borderInputError: {
    borderColor: "#D32F2F",
  },
  input: {
    flex: 1,
    padding: 8,
  },
  prefixContainer: {
    height: 45,
    width: 60,
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  suffixContainer: {
    height: 45,
    width: 60,
    backgroundColor: "#F5F5F5",
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InputText;
