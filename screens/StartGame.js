import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import MyButton from "../components/MyButton";

const StartGame = (props) => {
  const [enteredValue, setenteredValue] = useState("");
  const [confirmNumber, setconfirmNumber] = useState(false);
  const [selectedNumber, setselectedNumber] = useState();
  const [buttonWidth, setbuttonWidth] = useState(
    Dimensions.get("window").height / 4
  );
  const numberInput = (inputText) => {
    setenteredValue(inputText.replace(/[^0-9]/g, ""));
  };
  const resetInput = () => {
    setenteredValue("");
    setconfirmNumber(false);
  };
  useEffect(() => {
    const updateLayout = () => {
      setbuttonWidth(Dimensions.get("window").width / 4);
    };
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });
  const confirmInput = () => {
    const chosen = parseInt(enteredValue);
    if (isNaN(chosen) || chosen <= 0 || chosen > 99 || chosen === " ") {
      Alert.alert("invalid operation", "Number has to be btw 1-99", [
        { text: "Okay", style: "destructive", onPress: resetInput },
      ]);
    }
    setconfirmNumber(true);
    setselectedNumber(chosen);
    setenteredValue("");
    Keyboard.dismiss();
  };
  let confirmOutput;
  if (confirmNumber) {
    confirmOutput = (
      <Card style={styles.summary}>
        <Text>Your number :</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        {/* <Button
          title="Start Game"
          onclick={() => {
            props.onStartGame(selectedNumber);
          }}
        /> */}
        <MyButton onPress={() => props.onStartGame(selectedNumber)}>
          STart Game
        </MyButton>
      </Card>
    );
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior="position"
        keyboardVerticalOffset={30}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <Text style={styles.title}>Start a new Game</Text>
            <Card style={styles.inputContainer}>
              <Text>Select a number</Text>
              <Input
                style={styles.input}
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInput}
                value={enteredValue}
              />
              <View style={styles.buttonContainerr}>
                <View style={{ width: buttonWidth }} /*style={styles.button}*/>
                  <Button
                    title="Reset"
                    onPress={resetInput}
                    color={Colors.accent}
                  />
                </View>
                <View style={{ width: buttonWidth }} /*style={styles.button}*/>
                  <Button
                    title="Confirm "
                    onPress={confirmInput}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  inputContainer: {
    width: "80%",
    maxWidth: "90%",
    minWidth: 300,
    alignItems: "center",
  },
  buttonContainerr: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  // button: {
  //   //width: 90,
  //   width: Dimensions.get("window").width / 4,
  // },
  input: {
    width: 60,
    textAlign: "center",
  },
  summary: { marginTop: 20, alignItems: "center" },
});

module.exports = StartGame;
