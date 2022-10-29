
const Player = (name, playerSign) => {
  const getName = () => name;
  const getPlayerSign = () => playerSign;
  return { getName, getPlayerSign };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  
  const getBoard = (index) => {
    return board[index];
  }  

  const setBoard = (index, sign) => {
    board[index] = sign;
  }  

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
        board[i] = "";
    }    
  }
  
  const getWholeBoard = () => {
    return board;
  }

  return { getBoard, setBoard, reset, getWholeBoard };

})();  

const displayController = (() => {
  const gameSquares = document.querySelectorAll(".game-square");

  gameSquares.forEach((square) => {
    square.addEventListener("click", (e) => {
      if (gameController.getGameOver() || e.target.textContent !== "") return;
      gameController.playRound(e.target.dataset.index);
      console.log(e.target.dataset.index)
      updateGameBoard()
      console.log(gameBoard.getWholeBoard());
    });
  });

  const updateGameBoard = () => {
    for (let i = 0; i < gameSquares.length; i++) {
      gameSquares[i].textContent = gameBoard.getBoard(i);
    }
  };


})();

const gameController = (() => {
  const playerX = Player("Player X", "X");
  const playerO = Player("Player O", "O");
  let currentPlayer = playerX;
  let gameOver = false;

  const playRound = (index) => {
    if (gameOver) return;
    gameBoard.setBoard(index, currentPlayer.getPlayerSign());
    changePlayer();
  }

  const changePlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };

  const getGameOver = () => gameOver;

  const getCurrentPlayer = () => currentPlayer;

  return { getGameOver, getCurrentPlayer, playRound };
})();