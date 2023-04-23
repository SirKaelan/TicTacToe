import React from "react";
import {
  useIsGameActive,
  useGameWinner,
  useNewGame,
  useStartGame,
} from "./BoardContext";

// Component might become redundant?
const GameButtons = () => {
  const isGameActive = useIsGameActive();
  const gameWinner = useGameWinner();
  const newGame = useNewGame();
  const startGame = useStartGame();

  // TODO: Fix conditional logic
  if (!isGameActive && gameWinner === "") {
    return <button onClick={() => startGame()}>Start Game</button>;
  } else if (!isGameActive && gameWinner) {
    return <button onClick={() => newGame()}>New Game</button>;
  }
};

export default GameButtons;
