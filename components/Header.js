import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Colors from "../constants/Colors";
const Header = (props) => {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}
    >
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
    // backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerIOS: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
  },
  headertitle: {
    color: Platform.OS === "android" ? "white" : Colors.primary,
    fontSize: 18,
  },
});
module.exports = Header;
