let turn = "X";
let title = document.querySelector(".title");
let squares = [];
let gameMode = 0; // 0 is vs.player && 1 is vs. CPU
function start(id, mode) {
  elemnt = document.getElementById(id);
  if (mode === 1) {
    gameMode = 1;
  }
  let startScreen = document.getElementById("startScreen");
  let gameBoard = document.getElementById("gameBoard");
  startScreen.style.display = "none";
  gameBoard.style.display = "block";
}

function game(id) {
  let elemnt = document.getElementById(id);
  if (gameMode === 0) {
    if (turn === "X" && elemnt.innerHTML === "") {
      elemnt.innerHTML = "X";
      turn = "O";
      document.getElementById("turn").innerHTML = "O";
    } else {
      if (turn === "O" && elemnt.innerHTML === "") {
        elemnt.innerHTML = "O";
        turn = "X";
        document.getElementById("turn").innerHTML = "X";
      }
    }
  } else {
    if (elemnt.innerHTML === "") {
      elemnt.innerHTML = "O";
      turn = "X";
      compare();
      document.getElementById("item" + bestMove(squares).toString()).innerHTML =
        "X";
      turn = "O";
    }
  }
  compare();
}
//2player
function compare() {
  let boardIsFull = true;
  for (let i = 1; i < 10; i++) {
    squares[i] = document.getElementById("item" + i).innerHTML;
  }
  console.log(squares);
  for (let i = 1; i < squares.length; i++) {
    if (squares[i] === "") {
      boardIsFull = false;
      break;
    }
  }
  console.log(boardIsFull);
  if (
    squares[1] === squares[2] &&
    squares[2] === squares[3] &&
    squares[1] != ""
  ) {
    end(1, 2, 3);
  } else if (
    squares[4] === squares[5] &&
    squares[5] === squares[6] &&
    squares[4] != ""
  ) {
    end(4, 5, 6);
  } else if (
    squares[7] === squares[8] &&
    squares[8] === squares[9] &&
    squares[7] != ""
  ) {
    end(7, 8, 9);
  } else if (
    squares[1] === squares[4] &&
    squares[4] === squares[7] &&
    squares[1] != ""
  ) {
    end(1, 4, 7);
  } else if (
    squares[2] === squares[5] &&
    squares[5] === squares[8] &&
    squares[2] != ""
  ) {
    end(2, 5, 8);
  } else if (
    squares[3] === squares[6] &&
    squares[6] === squares[9] &&
    squares[3] != ""
  ) {
    end(3, 6, 9);
  } else if (
    squares[1] === squares[5] &&
    squares[5] === squares[9] &&
    squares[1] != ""
  ) {
    end(1, 5, 9);
  } else if (
    squares[3] === squares[5] &&
    squares[5] === squares[7] &&
    squares[3] != ""
  ) {
    end(3, 5, 7);
  } else {
    if (boardIsFull === true) {
      return end(0, 0, 0);
    }
  }
}
function end(num1, num2, num3) {
  let endScreen = document.getElementById("endScreen");
  let status = document.getElementById("status");
  let gameBoard = document.getElementById("gameBoard");
  if (num1 === 0) {
    status.innerHTML = "tie";
  } else {
    status.innerHTML = `winner: ${squares[num1]} `;
    document.getElementById("item" + num1).style.background = "#000";
    document.getElementById("item" + num2).style.background = "#000";
    document.getElementById("item" + num3).style.background = "#000";
  }

  setInterval(() => {
    gameBoard.style.display = "none";
  }, 1000);

  setInterval(() => {
    endScreen.style.display = "block";
  }, 1000);

  setInterval(function () {
    status.innerHTML += ".";
  }, 750);
  setInterval(function () {
    location.reload();
  }, 2500);
}

//cpu
let CPU = "X";
let p = "O";
function bestMove(input) {
  let board = inputToBoard(input);
  let bestScore = -2;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        board[i][j] = CPU;
        let score = maximum(board, 0, false);
        board[i][j] = "";
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }

  return result(move.i, move.j);
}

function maximum(board, lvl, isPcTurn) {
  let result = compareCPU(board);
  if (result !== undefined) {
    let score = result;
    return score;
  }
  if (isPcTurn === true) {
    let bestScore = -2;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // ist es frei?
        if (board[i][j] === "") {
          board[i][j] = CPU;
          let score = maximum(board, lvl + 1, false);
          board[i][j] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = 2;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // ist es frei?
        if (board[i][j] === "") {
          board[i][j] = p;
          let score = maximum(board, lvl + 1, true);
          board[i][j] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

function compareCPU(board) {
  let squares = ["leer"];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      squares.push(board[i][j]);
    }
  }
  let boardIsFull = true;
  for (let i = 1; i < squares.length; i++) {
    if (squares[i] === "") {
      boardIsFull = false;
      break;
    }
  }

  if (
    squares[1] === squares[2] &&
    squares[2] === squares[3] &&
    squares[1] != ""
  ) {
    return convertToNumbers(squares[1]);
  } else if (
    squares[4] === squares[5] &&
    squares[5] === squares[6] &&
    squares[4] != ""
  ) {
    return convertToNumbers(squares[4]);
  } else if (
    squares[7] === squares[8] &&
    squares[8] === squares[9] &&
    squares[7] != ""
  ) {
    return convertToNumbers(squares[7]);
  } else if (
    squares[1] === squares[4] &&
    squares[4] === squares[7] &&
    squares[1] != ""
  ) {
    return convertToNumbers(squares[1]);
  } else if (
    squares[2] === squares[5] &&
    squares[5] === squares[8] &&
    squares[2] != ""
  ) {
    return convertToNumbers(squares[2]);
  } else if (
    squares[3] === squares[6] &&
    squares[6] === squares[9] &&
    squares[3] != ""
  ) {
    return convertToNumbers(squares[3]);
  } else if (
    squares[1] === squares[5] &&
    squares[5] === squares[9] &&
    squares[1] != ""
  ) {
    return convertToNumbers(squares[1]);
  } else if (
    squares[3] === squares[5] &&
    squares[5] === squares[7] &&
    squares[3] != ""
  ) {
    return convertToNumbers(squares[3]);
  }
  if (boardIsFull === true) {
    return convertToNumbers("tie");
  }
}
function inputToBoard(input) {
  let y = 0;
  let x = 0;
  let board = [[], [], []];
  for (let i = 1; i < input.length; i++) {
    board[y][x] = input[i];
    x++;
    if (x % 3 === 0) {
      y++;
      x = 0;
    }
  }
  return board;
}

function convertToNumbers(a) {
  let result = a === "X" ? 1 : a === "O" ? -1 : 0;
  //return X = 1; O = -1; tie = 0
  return result;
}
function result(i, j) {
  let board = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];
  return board[i][j];
}

// console.log(bestMove(["X", "X", "O", "O", "O", "X", "X", "", "O"]));
