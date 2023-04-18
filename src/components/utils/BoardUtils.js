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
