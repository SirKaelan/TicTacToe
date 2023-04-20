import React from "react";
import { useIsGameActive, useGameWinner } from "./BoardContext";

const GameOverMessage = () => {
  const isGameActive = useIsGameActive();
  const gameWinner = useGameWinner();

  // Write logic for message decision
  return <p>Message component!</p>;
};

export default GameOverMessage;
