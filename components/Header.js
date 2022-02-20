import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headertitle}>{props.title}</Text>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 30,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  headertitle: {
    color: "black",
    fontSize: 18,
  },
});
module.exports = Header;
