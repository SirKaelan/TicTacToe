export const toMatrix = (arr, cols) => {
  return arr.reduce(
    (matrix, tileVal, tileValIndex) =>
      // Check to see if incoming value should create a new row or be added to an existing one
      (tileValIndex % cols === 0
        ? matrix.push([tileVal])
        : matrix[matrix.length - 1].push(tileVal)) && matrix,
    []
  );
};

export const getMatrixColumn = (matrix, col) => {
  return matrix.map((row) => row[col]);
};

export const getMatrixDiagonal = (matrix, diagonal) => {
  if (diagonal === 0) return matrix.map((row, i) => row[i]);
  else return matrix.map((row, i, matrix) => row[matrix.length - 1 - i]);
};

export const equalTiles = (arr) => {
  if (arr.includes("empty")) return false;
  return arr.every((tileVal) => (tileVal === arr[0] ? true : false));
};
