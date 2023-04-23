import React from "react";
import {
  useIsGameActive,
  useGameWinner,
  useNewGame,
  useStartGame,
} from "./BoardContext";

import Button from "./Button";

// Component might become redundant?
const GameButtons = () => {
  const isGameActive = useIsGameActive();
  const gameWinner = useGameWinner();
  const newGame = useNewGame();
  const startGame = useStartGame();

  // TODO: Fix conditional logic
  if (!isGameActive && gameWinner === "") {
    return <Button handler={startGame} label="Start Game" />;
  } else if (!isGameActive && gameWinner) {
    return <Button handler={newGame} label="New Game" />;
  }
};

export default GameButtons;
