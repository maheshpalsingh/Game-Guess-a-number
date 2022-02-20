import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const MyButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
  },
});

module.exports = MyButton;
