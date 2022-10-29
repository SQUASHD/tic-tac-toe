
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
  let winner;

  const playRound = (index) => {
    if (gameOver) return;
    gameBoard.setBoard(index, currentPlayer.getPlayerSign());
    checkWinner()
    changePlayer();
  }

  const changePlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };

  const getGameOver = () => gameOver;

  const getCurrentPlayer = () => currentPlayer;

  const checkWinner = () => {
    let winConditions =[
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    winConditions.forEach((condition) => {
      if (
        gameBoard.getBoard(condition[0]) === gameBoard.getBoard(condition[1]) &&
        gameBoard.getBoard(condition[1]) === gameBoard.getBoard(condition[2]) &&
        gameBoard.getBoard(condition[0]) !== ""
      ) {
        gameOver = true;
        winner = currentPlayer;
      }
    });
  };

  return { getGameOver, getCurrentPlayer, playRound };
})();