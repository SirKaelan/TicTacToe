import React from "react";
import "./Board.css";

import {
  useBoard,
  useChangeTile,
  useCurrentPlayer,
  useChangeCurrentPlayer,
  useIsGameActive,
  useChangeIsGameActive,
  useChangeGameWinner,
  useGameWinner,
} from "./BoardContext";
import OTile from "./OTile";
import XTile from "./XTile";
import EmptyTile from "./EmptyTile";
import GameOverMessage from "./GameOverMessage";
import GameButtons from "./GameButtons";

import { GeneralUtils } from "./utils";
import { BoardUtils } from "./utils";

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

const Board = () => {
  const boardData = useBoard();
  const changeTile = useChangeTile();
  const currentPlayer = useCurrentPlayer();
  const changeCurrentPlayer = useChangeCurrentPlayer();
  const isGameActive = useIsGameActive();
  const changeIsGameActive = useChangeIsGameActive();
  const changeGameWinner = useChangeGameWinner();
  const gameWinner = useGameWinner();
  const state = { boardData, currentPlayer, isGameActive, gameWinner };
  console.log("State: ", state);

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
      <GameButtons />
      <GameOverMessage />
    </>
  );
};

export default Board;
