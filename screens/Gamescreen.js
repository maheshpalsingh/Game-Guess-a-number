import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import DefaultStyles from "../constants/default-styles";
import NumberContainer from "../components/NumberContainer";
import MyButton from "../components/MyButton";
const generateRandom = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randNum = Math.floor(Math.random() * (max - min)) + min;
  if (randNum === exclude) {
    return generateRandom(min, max, exclude);
  } else {
    return randNum;
  }
};
// const renderedGuess = (value, noofguess) => (
//   <View style={styles.listItems} key={value}>
//     <Text style={DefaultStyles.bodyTextwithblack}>#{noofguess}</Text>
//     <Text style={DefaultStyles.bodyTextwithblack}>{value}</Text>
//   </View>
// );
const renderedGuess = (noofguess, value) => (
  <View style={styles.listItems}>
    <Text style={DefaultStyles.bodyTextwithblack}>
      #{noofguess - value.index}
    </Text>
    <Text style={DefaultStyles.bodyTextwithblack}>{value.item}</Text>
  </View>
);
const Gamescreen = (props) => {
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  const initialGuess = generateRandom(1, 100, props.userChoice);
  const [currentGuess, setcurrentGuess] = useState(initialGuess);
  const [pastguess, setpastguess] = useState([initialGuess]);
  const { onGameOver, userChoice } = props;
  const [availablewidth, setavailablewidth] = useState(
    Dimensions.get("window").width
  );
  const [availableheight, setavailableheight] = useState(
    Dimensions.get("window").height
  );
  useEffect(() => {
    const layout = () => {
      setavailableheight(Dimensions.get("window").height),
        setavailablewidth(Dimensions.get("window").width);
    };
    Dimensions.addEventListener("change", layout);
    return () => {
      Dimensions.removeEventListener("change", layout);
    };
  });
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastguess.length);
    }
  }, [currentGuess, userChoice, onGameOver]);
  const currentlow = useRef(1);
  const currenthigh = useRef(100);
  const nextGuessHandler = (direction) => {
    if (
      (direction === "greater" && currentGuess > props.userChoice) ||
      (direction === "lower" && currentGuess < props.userChoice)
    ) {
      Alert.alert("Don't lie", "You know this is wrong.", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currenthigh.current = currentGuess;
    } else {
      currentlow.current = currentGuess + 1;
    }
    const nextGuess = generateRandom(
      currentlow.current,
      currenthigh.current,
      currentGuess
    );
    setcurrentGuess(nextGuess);
    //setguesscnt((curRounds) => curRounds + 1);
    setpastguess((curPastguess) => [nextGuess, ...curPastguess]);
  };

  if (availableheight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Opponents Guess</Text>
        <View style={styles.smallscreen}>
          <MyButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="arrow-down-circle" size={24} color="black" />
          </MyButton>
          <NumberContainer> {currentGuess} </NumberContainer>
          <MyButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="arrow-up-circle" size={24} color="black" />
          </MyButton>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={(item) => item}
            data={pastguess}
            renderItem={renderedGuess.bind(this, pastguess.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponents Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MyButton onPress={nextGuessHandler.bind(this, "lower")}>
          {/* LOWER */}
          <Ionicons name="arrow-down-circle" size={24} color="black" />
        </MyButton>
        <MyButton onPress={nextGuessHandler.bind(this, "greater")}>
          {/* GREATER */}
          <Ionicons name="arrow-up-circle" size={24} color="black" />
        </MyButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastguess.map((guess, index) =>
            renderedGuess(guess, pastguess.length - index)
          )}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastguess}
          renderItem={renderedGuess.bind(this, pastguess.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  smallscreen: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    //marginTop: 20,
    marginTop: Dimensions.get("window").height > 600 ? 15 : 5,
    width: Dimensions.get("window").width / 3,
    maxWidth: "95%",
    minWidth: 300,
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end",
    //alignItems: "center",
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get("window").width > 400 ? "60%" : "80%",
  },
  listItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ffae42",
    // width: "60%",
    width: "100%",
  },
});

module.exports = Gamescreen;
