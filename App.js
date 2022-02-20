import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import StartGame from "./screens/StartGame";
import Gamescreen from "./screens/Gamescreen";
import Gameover from "./screens/Gameover";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setuserNumber] = useState();
  const [guessRound, setguessRound] = useState(0);
  const [dataLoad, setdataLoad] = useState(false);

  if (!dataLoad) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setdataLoad(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const restartGame = () => {
    setguessRound(0);
    setuserNumber(null);
  };

  const startGame = (selectedNumber) => {
    setuserNumber(selectedNumber);
    setguessRound(0);
  };

  const gameOver = (numofGuess) => {
    setguessRound(numofGuess);
  };
  let content = <StartGame onStartGame={startGame} />;
  if (userNumber && guessRound <= 0) {
    content = <Gamescreen userChoice={userNumber} onGameOver={gameOver} />;
  } else if (guessRound > 0) {
    content = (
      <Gameover
        totno={guessRound}
        userChoice={userNumber}
        restart={restartGame}
      />
    );
  }
  return (
    <View style={styles.screen}>
      <Header title="Guess a number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
  },
});
