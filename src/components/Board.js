import React from "react";
import "./Board.css";

import {
  useBoard,
  useSetTile,
  useCurrentPlayer,
  useChangeCurrentPlayer,
  useIsGameActive,
  useChangeIsGameActive,
  useChangeGameWinner,
  useGameWinner,
  useNewGame,
  useStartGame,
} from "./BoardContext";
import { OTile } from "./tiles";
import { XTile } from "./tiles";
import { EmptyTile } from "./tiles";
import Button from "./Button";
import Message from "./Message";

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

const handleTileClick =
  (isGameActive, player, setTile, swapPlayer) => (event) => {
    if (!isGameActive) return;

    const tileEl = event.target;
    if (!tileEl.classList.contains("tile") || tileEl.innerHTML !== "") return;

    const tileIndex = BoardUtils.getTileIndex(tileEl);
    const nextPlayer = player === "X" ? "O" : "X";

    setTile(tileIndex, player);
    swapPlayer(nextPlayer);
  };

const Board = () => {
  const boardData = useBoard();
  const setTile = useSetTile();
  const currentPlayer = useCurrentPlayer();
  const changeCurrentPlayer = useChangeCurrentPlayer();
  const isGameActive = useIsGameActive();
  const changeIsGameActive = useChangeIsGameActive();
  const changeGameWinner = useChangeGameWinner();
  const gameWinner = useGameWinner();
  const newGame = useNewGame();
  const startGame = useStartGame();
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

  let renderedButton;
  if (!isGameActive && gameWinner === "")
    renderedButton = <Button onClick={startGame} label="Start Game" />;
  else if (!isGameActive && gameWinner)
    renderedButton = <Button onClick={newGame} label="New Game" />;

  let gameOverMsg;
  if (!isGameActive && (gameWinner === "X" || gameWinner === "O")) {
    const msgContent = `Player ${gameWinner} has won!`;
    gameOverMsg = <Message content={msgContent} />;
  } else if (!isGameActive && gameWinner === "draw") {
    const msgContent = "The game is a draw! No winners.";
    gameOverMsg = <Message content={msgContent} />;
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
          onClick={handleTileClick(
            isGameActive,
            currentPlayer,
            setTile,
            changeCurrentPlayer
          )}
        >
          {renderedTiles}
        </div>
      </div>
      {renderedButton}
      {gameOverMsg}
    </>
  );
};

export default Board;
