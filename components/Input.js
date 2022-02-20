import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = (props) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    width: 80,
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginVertical: 10,
  },
});

module.exports = Input;
