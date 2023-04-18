import React from "react";
import "./Board.css";

import {
  useBoard,
  useChangeTile,
  useCurrentPlayer,
  useChangeCurrentPlayer,
  useResetBoard,
  useIsGameActive,
  useChangeIsGameActive,
  useGameWinner,
  useChangeGameWinner,
} from "./BoardContext";
import OTile from "./OTile";
import XTile from "./XTile";
import EmptyTile from "./EmptyTile";

import { GeneralUtils } from "./utils";
import { BoardUtils } from "./utils";

const onTileClick =
  (currentPlayer, changeTile, changeCurrentPlayer, isGameActive) => (event) => {
    if (!isGameActive) return;

    const tileEl = event.target;
    if (!tileEl.classList.contains("tile") || tileEl.innerHTML !== "") return;

    const tileIndex = BoardUtils.getTileIndex(tileEl);
    const nextPlayer = currentPlayer === "X" ? "O" : "X";

    changeTile(tileIndex, currentPlayer);
    changeCurrentPlayer(nextPlayer);
  };

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

const isGameOver = (gameBoard) => {
  let gameOverData = {
    gameOver: false,
    winner: null,
  };

  // Not sure if this approach is good, because this func returns a value
  // If board is empty
  if (gameBoard.every((tileVal) => tileVal === "empty")) return gameOverData;

  const matrixBoard = GeneralUtils.toMatrix(gameBoard, 3);

  // Look through each row
  for (let i = 0; i < matrixBoard.length; i++) {
    const row = matrixBoard[i];

    if (GeneralUtils.equalTiles(row)) {
      gameOverData = {
        gameOver: true,
        winner: row[0],
      };
      break;
    }
  }

  // Look through each column
  for (let i = 0; i < matrixBoard.length; i++) {
    const col = GeneralUtils.getMatrixColumn(matrixBoard, i);

    if (GeneralUtils.equalTiles(col)) {
      gameOverData = {
        gameOver: true,
        winner: col[0],
      };
      break;
    }
  }

  // Look through each diagonal
  for (let i = 0; i < 2; i++) {
    const diagonal = GeneralUtils.getMatrixDiagonal(matrixBoard, i);

    if (GeneralUtils.equalTiles(diagonal)) {
      gameOverData = {
        gameOver: true,
        winner: diagonal[0],
      };
      break;
    }
  }

  // None of the conditions above are met
  if (!gameOverData.gameOver && !gameBoard.includes("empty")) {
    const newGameOverData = {
      gameOver: true,
      winner: "draw",
    };

    gameOverData = newGameOverData;
  }

  return gameOverData;
};

// This is the component
const Board = () => {
  const boardData = useBoard();
  const changeTile = useChangeTile();
  const currentPlayer = useCurrentPlayer();
  const changeCurrentPlayer = useChangeCurrentPlayer();
  const resetBoard = useResetBoard();
  const isGameActive = useIsGameActive();
  const changeIsGameActive = useChangeIsGameActive();
  const gameWinner = useGameWinner();
  const changeGameWinner = useChangeGameWinner();

  React.useEffect(() => {
    if (!isGameActive) return;

    const { gameOver, winner } = isGameOver(boardData);
    if (gameOver) {
      changeIsGameActive(false);
      changeGameWinner(winner);
    }
  });

  const renderedTiles = boardData.map((tileValue, i) => {
    switch (tileValue) {
      case "X":
        return <XTile key={i} />;
      case "O":
        return <OTile key={i} />;
      case "empty":
        return <EmptyTile key={i} />;
      default:
        return null;
    }
  });

  // Maybe this can be extracted into a separate function?
  // TODO: Logic most likely needs a review and a change
  let gameOverMessage = null;
  if (!isGameActive && gameWinner !== "" && gameWinner !== "draw") {
    gameOverMessage = <p>Player {gameWinner} has won!</p>;
  } else if (!isGameActive && gameWinner === "draw") {
    gameOverMessage = <p>The game is a draw! No winners.</p>;
  }

  return (
    // TODO: HTML structure might need to be reworked
    <>
      {!isGameActive ? null : (
        <p className="player">Current player: {currentPlayer}</p>
      )}
      <div className="board_container">
        <div
          className="grid"
          onClick={onTileClick(
            currentPlayer,
            changeTile,
            changeCurrentPlayer,
            isGameActive
          )}
        >
          {renderedTiles}
        </div>
      </div>
      {/* TODO: Fix CSS for conditionally rendered content */}
      {/* TODO: Somehow move conditional rendering logic */}
      {!isGameActive && gameWinner === "" && (
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
      )}
      {!isGameActive && gameWinner && (
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
      )}
      {gameOverMessage}
    </>
  );
};

export default Board;
