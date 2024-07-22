const cells = document.querySelectorAll('.cell');
const gameStatus = document.querySelector('#game-status');
const restartBtn = document.querySelector('#restart-btn');
const clearScoreboardBtn = document.querySelector('#clear-btn');
let xScore = document.querySelector('#xscore');
let oScore = document.querySelector('#oscore');

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ['', '', '', '', '', '', '', '', ''];
let currPlayer = 'X';
let running = false;

startGame();

function startGame() {
  cells.forEach((cell) => cell.addEventListener('click', cellClicked));
  restartBtn.addEventListener('click', restartGame);
  clearScoreboardBtn.addEventListener('click', clearScoreboard);
  gameStatus.textContent = `${currPlayer}'s turn`;
  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute('cellIndex');

  if (options[cellIndex] !== '' || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currPlayer;
  cell.textContent = currPlayer;
}

function changePlayer() {
  currPlayer = currPlayer === 'X' ? 'O' : 'X';
  gameStatus.textContent = `${currPlayer}'s turn`;
}

function checkWinner() {
  let gameWon = false;

  for (let i = 0; i < winPatterns.length; i++) {
    const condition = winPatterns[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === '' || cellB === '' || cellC === '') {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      gameWon = true;
      break;
    }
  }

  if (gameWon) {
    gameStatus.textContent = `${currPlayer} wins!`;
    if (currPlayer === 'X') {
      xScore.innerHTML = parseInt(xScore.innerHTML) + 1;
    }
    if (currPlayer === 'O') {
      oScore.innerHTML = parseInt(oScore.innerHTML) + 1;
    }
    running = false;
  } else if (!options.includes('')) {
    gameStatus.textContent = 'Draw!';
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  options = ['', '', '', '', '', '', '', '', ''];
  currPlayer = 'X';
  cells.forEach((cell) => (cell.textContent = ''));
  gameStatus.textContent = `${currPlayer}'s turn`;
  running = true;
}

function clearScoreboard(){
    xScore.innerHTML = 0;
    oScore.innerHTML = 0;
}