import React from "react";
import { View, StyleSheet } from "react-native";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 10,
    shadowColor: "black",
    shadowRadius: 6,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: "white",
    padding: 20,
    //borderRadius: 15,
    //borderBottomLeftRadius: 15,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});

module.exports = Card;
