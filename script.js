const gameBoard = (() => {
  // const board = ["", "", "", "", "", "", "", "", ""];
  const board = [["X", "O", "X"], ["O", "X", "O"], ["X", "O", "X"]];
  const getBoard = (i,j) => board[i][j];
  const setBoard = (index, sign) => {
    board[index] = sign;
  }
  return { getBoard, setBoard };
})();

const Player = (name, playerSign) => {
  const getName = () => name;
  const getPlayerSign = () => playerSign;
  return { getName, getPlayerSign };
};

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("square-index", `${i},${j}`);
    square.textContent = gameBoard.getBoard(i,j);
    
    square.addEventListener("click", () => {
      console.log(square.getAttribute("square-index"));
    });
    document.querySelector(".game-board").appendChild(square);
  }
}

console.log(gameBoard.getBoard(0,0));
gameBoard.setBoard((0,0), "O");
console.log(gameBoard.getBoard(0,0));