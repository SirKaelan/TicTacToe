import React from "react";
import { useIsGameActive, useGameWinner } from "./BoardContext";

const GameOverMessage = () => {
  const isGameActive = useIsGameActive();
  const gameWinner = useGameWinner();

  const gameOverAndWinner =
    !isGameActive && gameWinner !== "draw" && gameWinner !== "";
  const gameOverAndDraw = !isGameActive && gameWinner === "draw";

  let message = null;
  if (gameOverAndWinner) {
    message = `Player ${gameWinner} has won!`;
  } else if (gameOverAndDraw) {
    message = "The game is a draw! No winners.";
  }

  return message ? <p>{message}</p> : null;
};

export default GameOverMessage;
