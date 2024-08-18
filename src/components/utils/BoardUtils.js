import { GeneralUtils } from ".";

// Questionable approach
export const getTileIndex = (el) => {
  const previousSiblings = [];

  // Get all previous siblings of clicked tile
  while ((el = el.previousElementSibling)) {
    previousSiblings.push(el);
  }

  // Return their number/length and that's the index of the current tile
  return previousSiblings.length;
};

export const pickRandomPlayer = () => {
  const players = ["X", "O"];
  const randomNum = Math.floor(Math.random() * players.length);
  return players[randomNum];
};

export const isGameOver = (gameBoard) => {
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
