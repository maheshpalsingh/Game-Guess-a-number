import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import Colors from "../constants/Colors";
import DefaultStyles from "../constants/default-styles";
import MyButton from "../components/MyButton";
const Gameover = (props) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={DefaultStyles.bodyText}>Game Over</Text>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            //source={require("../assets/success.png")}
            source={{
              uri: "https://dx5683gi1tv0w.cloudfront.net/dtrjyhj9q/image/upload/w_1080,h_1080,c_pad,b_auto/s3/img0be16e8d8",
            }}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.text}>
          Rounds to find correct no:
          <Text style={styles.number}>{props.totno}</Text> Number was:
          <Text style={styles.number}>{props.userChoice}</Text>
        </Text>
        <MyButton onPress={props.restart}>New Game</MyButton>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: Dimensions.get("window").width / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30,
  },
  text: {
    fontSize: Dimensions.get("window").height < 500 ? 16 : 18,
    marginHorizontal: 25,
    marginVertical: 25,
  },
  number: {
    color: Colors.accent,
  },
});

module.exports = Gameover;
