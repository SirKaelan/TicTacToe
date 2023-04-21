import React from "react";
import {
  useIsGameActive,
  useChangeIsGameActive,
  useGameWinner,
  useChangeGameWinner,
  useChangeCurrentPlayer,
  useResetBoard,
} from "./BoardContext";

import { BoardUtils } from "./utils";

const onStartBtnClick = (
  changeIsGameActive,
  changeCurrentPlayer,
  pickRandomPlayer
) => {
  changeIsGameActive(true);
  changeCurrentPlayer(pickRandomPlayer());
};

const onNewBtnClick = (
  resetBoard,
  changeGameWinner,
  changeIsGameActive,
  changeCurrentPlayer,
  pickRandomPlayer
) => {
  resetBoard();
  changeGameWinner("");
  changeIsGameActive(true);
  changeCurrentPlayer(pickRandomPlayer());
};

const GameButtons = () => {
  const isGameActive = useIsGameActive();
  const changeIsGameActive = useChangeIsGameActive();
  const gameWinner = useGameWinner();
  const changeGameWinner = useChangeGameWinner();
  const changeCurrentPlayer = useChangeCurrentPlayer();
  const resetBoard = useResetBoard();

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
    return (
      <button
        onClick={() =>
          onNewBtnClick(
            resetBoard,
            changeGameWinner,
            changeIsGameActive,
            changeCurrentPlayer,
            BoardUtils.pickRandomPlayer
          )
        }
      >
        New Game
      </button>
    );
  }
};

export default GameButtons;
