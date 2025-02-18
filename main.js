let turn = "X";
let gameMode = 0; // 0 is vs. player, 1 is vs. CPU
let squares = Array(10).fill(""); // Track game state

const CPU = "X";
const player = "O";

function startGame(mode) {
  gameMode = mode; // Set game mode
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameBoard").style.display = "block";
  updateTurnDisplay();

  if (gameMode === 1 && turn === CPU) {
    cpuTurn(); // CPU starts the game
  }
}

function gameTurn(id) {
  if (squares[id] === "") {
    squares[id] = turn; // Update square with current turn
    document.getElementById(`item${id}`).innerHTML = turn;
    if (checkWin()) {
      endGame(`${turn} Wins!`);
    } else if (squares.slice(1).every((square) => square !== "")) {
      endGame("It's a Tie!");
    } else {
      switchTurn();
      if (gameMode === 1 && turn === CPU) cpuTurn(); // CPU takes a turn
    }
  }
}

function switchTurn() {
  turn = turn === "X" ? "O" : "X";
  updateTurnDisplay();
}

function updateTurnDisplay() {
  document.getElementById("turn").innerHTML = `Player ${turn}'s Turn`;
}

function checkWin() {
  const winPatterns = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  return winPatterns.some(
    (pattern) => squares[pattern[0]] === turn && squares[pattern[1]] === turn && squares[pattern[2]] === turn
  );
}

function endGame(message) {
  setTimeout(() => {
    document.getElementById("gameBoard").style.display = "none";
    document.getElementById("endScreen").style.display = "block";
  }, 1500);
  document.getElementById("status").innerHTML = message;
  setTimeout(() => location.reload(), 3000); // Reload game after 2.5s
}

// CPU Turn using Minimax Algorithm
function cpuTurn() {
  const bestMoveIdx = getBestMove(squares);
  gameTurn(bestMoveIdx); // Make CPU's move after determining the best move
}

function getBestMove(board) {
  let bestScore = -Infinity;
  let move;

  // Loop through all available moves
  for (let i = 1; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = CPU; // Temporarily make the move
      let score = minimax(board, 0, false); // Evaluate the move using Minimax
      board[i] = ""; // Undo the move

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(board, depth, isMaximizing) {
  let result = evaluateBoard(board);
  if (result !== null) return result; // Return the score if the game is over

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 1; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = CPU;
        let score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 1; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = player;
        let score = minimax(board, depth + 1, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function evaluateBoard(board) {
  const winPatterns = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] === board[b] && board[b] === board[c] && board[a] !== "") {
      return board[a] === CPU ? 1 : -1; // Return score for CPU win (+1) or Player win (-1)
    }
  }

  // Tie (draw)
  if (board.slice(1).every((square) => square !== "")) {
    return 0;
  }

  // Game not over
  return null;
}
