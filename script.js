
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
    console.log(board)
  }  

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
        board[i] = "";
    }    
  }

  return { getBoard, setBoard, reset };

})();  

const displayController = (() => {
  const gameSquares = document.querySelectorAll(".game-square");
  const gameDisplay = document.querySelector(".game-display");

  gameSquares.forEach((square) => {
    square.addEventListener("click", (e) => {
      if (gameController.getGameOver() || e.target.textContent !== "") return;
      gameController.playRound(e.target.dataset.index);
      updateGameBoard();
    });
  });

  const updateGameBoard = () => {
    for (let i = 0; i < gameSquares.length; i++) {
      gameSquares[i].textContent = gameBoard.getBoard(i);
    }
  };

  const setMessage = () => {
    let message;
    if (gameController.getWinner() === "draw") {
      message = "It's a draw!";
    }
    else if (gameController.getGameOver()) {
      message = `${gameController.getWinner()} won!`;
      console.log(gameController.getWinner());
    }
    else{
      message = `${gameController.getCurrentPlayer().getName()}'s Turn`;
    }

    gameDisplay.textContent = message;
    };

  return {setMessage};
    
  })();

const gameController = (() => {
  const playerX = Player("Player X", "X");
  const playerO = Player("Player O", "O");
  let currentPlayer = playerX;
  let gameOver = false;
  let winner = null;

  const playRound = (index) => {
    if (gameOver) return;
    gameBoard.setBoard(index, currentPlayer.getPlayerSign());
    checkWinner()
    changePlayer()
    displayController.setMessage();
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
        winner = currentPlayer.getName();
      }
      else if (!gameOver && gameController.checkDraw()) {
        gameOver = true;
        winner = "draw";
      }
    });
  };

  const checkDraw = () => {
    for (let i = 0; i < 9; i++) {
      if (gameBoard.getBoard(i) === "") {
        return false;
      }
    }
    return true;
  };

  const getWinner = () => winner 

  return { getGameOver, getCurrentPlayer, playRound, getWinner, checkDraw };
})();

window.onload = () => {
  displayController.setMessage();
};

