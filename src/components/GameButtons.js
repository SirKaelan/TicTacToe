import React from "react";
import {
  useIsGameActive,
  useChangeIsGameActive,
  useGameWinner,
  useChangeCurrentPlayer,
  useNewGame,
} from "./BoardContext";

import { BoardUtils } from "./utils";

const onStartBtnClick = (
  changeIsGameActive,
  changeCurrentPlayer,
  pickRandomPlayer
) => {
  // startGame();
  changeIsGameActive(true);
  changeCurrentPlayer(pickRandomPlayer());
};

const GameButtons = () => {
  const isGameActive = useIsGameActive();
  const changeIsGameActive = useChangeIsGameActive();
  const gameWinner = useGameWinner();
  const changeCurrentPlayer = useChangeCurrentPlayer();
  const newGame = useNewGame();

  if (!isGameActive && gameWinner === "") {
    return (
      <button
        onClick={() =>
          onStartBtnClick(
            changeIsGameActive,
            changeCurrentPlayer,
            BoardUtils.pickRandomPlayer
          )
        }
      >
        Start Game
      </button>
    );
  } else if (!isGameActive && gameWinner) {
    return <button onClick={() => newGame()}>New Game</button>;
  }
};

export default GameButtons;
