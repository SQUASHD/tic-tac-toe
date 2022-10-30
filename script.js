
const Player = (name, playerSign) => {
  const getName = () => name;
  
  const getPlayerSign = () => playerSign;
  
  return { getName, getPlayerSign };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  
  const getBoard = (index) => {
    return board[index];
  };

  const setBoard = (index, sign) => {
    board[index] = sign;
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
        board[i] = "";
    };
  };

  return { getBoard, setBoard, reset };

})();  

const displayController = (() => {
  const gameSquares = document.querySelectorAll(".game-square");
  const gameDisplay = document.querySelector(".game-display");
  
  let darkModeToggled = false;
  const darkModeButton = document.querySelector(".dark-mode-button");

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
    };
  };

  const setMessage = () => {
    let message;

    if (gameController.getWinner() === "draw") {
      message = "It's a draw!";
    }
    else if (gameController.getGameOver()) {
      message = `${gameController.getWinner()} won!`;
    }
    else {
      message = `${gameController.getCurrentPlayer().getName()}'s Turn`;
    }

    gameDisplay.textContent = message;
  };

  const toggleDarkMode = () => {
    const darkToggleableElements = document.querySelectorAll(".dark-mode-toggle");
    darkToggleableElements.forEach((element) => {
      element.classList.toggle("dark");
    });
    
    darkModeToggled = !darkModeToggled;
    const darkModeButtonContent = darkModeToggled ? "Light Mode" : "Dark Mode";
    darkModeButton.textContent = darkModeButtonContent;
  };

  darkModeButton.addEventListener("click", toggleDarkMode);

  return { setMessage, updateGameBoard, toggleDarkMode };
    
  })();

const gameController = (() => {
  const playerX = Player("Player X", "X");
  const playerO = Player("Player O", "O");
  let currentPlayer = playerX;
  let gameOver = false;
  let winner = null;

  const resetButton = document.querySelector(".reset-button");

  const playRound = (index) => {
    gameBoard.setBoard(index, currentPlayer.getPlayerSign());
    checkWinner()
    changePlayer()
    displayController.setMessage();
  };

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
      else if (!gameOver && gameController.setDrawWhenNoWinner()) {
        gameOver = true;
        winner = "draw";
      }
    });
  };

  const setDrawWhenNoWinner = () => {
    for (let i = 0; i < 9; i++) {
      if (gameBoard.getBoard(i) === "") {
        return false;
      }
    }
    if (winner === null) {
      return true;
    };
  };

  const getWinner = () => winner 

  const resetGame = () => {
    gameOver = false;
    winner = null;
    currentPlayer = playerX;
    gameBoard.reset();
    displayController.updateGameBoard();
    displayController.setMessage();
  };

  resetButton.addEventListener("click", resetGame);

  return { getGameOver, getCurrentPlayer, playRound, setDrawWhenNoWinner, getWinner };
})();

window.onload = () => {
  displayController.setMessage();
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
  }
  else {
    displayController.toggleDarkMode();
  }
};

