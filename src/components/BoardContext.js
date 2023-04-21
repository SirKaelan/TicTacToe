import React from "react";
import { BoardUtils } from "./utils";

// Maybe the context name needs to change
export const BoardContext = React.createContext(null);

// TODO: Change names of pieces of state
const gameData = {
  board: [
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
  ],
  currentPlayer: "",
  isGameActive: false,
  gameWinner: "",
};

export const BoardProvider = ({ children }) => {
  const [gameState, setGameState] = React.useState(gameData);

  return (
    <BoardContext.Provider value={[gameState, setGameState]}>
      {children}
    </BoardContext.Provider>
  );
};

// TODO: Rename all hooks if possible
// Custom hooks
export const useNewGame = () => {
  const [_, setGameState] = React.useContext(BoardContext);

  return () => {
    const newGameState = (prevState) => {
      const prevBoard = prevState.board;
      const newBoard = prevBoard.map((tileValue) => {
        return tileValue === "empty" ? tileValue : "empty";
      });

      return {
        ...prevState,
        board: newBoard,
        gameWinner: "",
        isGameActive: true,
        currentPlayer: BoardUtils.pickRandomPlayer(),
      };
    };

    setGameState((prevState) => newGameState(prevState));
  };
};

export const useStartGame = () => {
  const [_, setGameState] = React.useContext(BoardContext);

  return () => {
    const newGameState = (prevState) => {
      return {
        ...prevState,
        isGameActive: true,
        currentPlayer: BoardUtils.pickRandomPlayer(),
      };
    };

    setGameState((prevState) => newGameState(prevState));
  };
};

// stopGame

export const useBoard = () => {
  const [{ board }] = React.useContext(BoardContext);

  return board;
};

// Still not sure if this hook is needed
export const useResetBoard = () => {
  // Not sure if getting the prev game state from here is proper
  const [prevGameState, setGameState] = React.useContext(BoardContext);

  return () => {
    const prevBoard = prevGameState.board;
    const newBoard = prevBoard.map((tileValue) => {
      return tileValue === "empty" ? tileValue : "empty";
    });

    const newGameState = {
      ...prevGameState,
      board: newBoard,
    };

    setGameState(newGameState);
  };
};

export const useChangeTile = () => {
  const [prevGameState, setGameState] = React.useContext(BoardContext);

  return (tileIndex, tileValue) => {
    const newBoard = [...prevGameState.board];
    newBoard.splice(tileIndex, 1, tileValue);

    const newGameState = {
      ...prevGameState,
      board: newBoard,
    };

    setGameState(newGameState);
  };
};

export const useCurrentPlayer = () => {
  const [{ currentPlayer }] = React.useContext(BoardContext);

  return currentPlayer;
};

// Little change in implementation to receive previous state in setState callback
// Maybe this needs to be done for changing the tile?
export const useChangeCurrentPlayer = () => {
  const [_, setGameState] = React.useContext(BoardContext);

  // Potentially i don't need to receive the new player as input? Makes it easier to use
  return (newPlayer) => {
    const newGameState = (prevGameState) => {
      return {
        ...prevGameState,
        currentPlayer: newPlayer,
      };
    };

    setGameState((prevState) => newGameState(prevState));
  };
};

export const useIsGameActive = () => {
  const [{ isGameActive }] = React.useContext(BoardContext);

  return isGameActive;
};

export const useChangeIsGameActive = () => {
  const [_, setGameState] = React.useContext(BoardContext);

  return (newValue) => {
    const newGameState = (prevGameState) => {
      return {
        ...prevGameState,
        isGameActive: newValue,
      };
    };

    setGameState((prevState) => newGameState(prevState));
  };
};

export const useGameWinner = () => {
  const [{ gameWinner }] = React.useContext(BoardContext);

  return gameWinner;
};

export const useChangeGameWinner = () => {
  const [_, setGameState] = React.useContext(BoardContext);

  return (winner) => {
    const newGameState = (prevGameState) => {
      return {
        ...prevGameState,
        gameWinner: winner,
      };
    };

    setGameState((prevState) => newGameState(prevState));
  };
};

// TODO: Maybe add general hooks that change multiple pieces of the state at once such as "startGame" and "restartGame"
