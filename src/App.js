import React from "react";
import "./App.css";
import { BoardProvider } from "./components/BoardContext";

import Board from "./components/Board";

const App = () => {
  return (
    <BoardProvider>
      <Board />
    </BoardProvider>
  );
};

export default App;
