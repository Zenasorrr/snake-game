const game = document.getElementById("game");
const startScreen = document.getElementById("start-screen");
const gameContainer = document.getElementById("game-container");
const startButton = document.getElementById("start-button");
const startCellInput = document.getElementById("start-cell");

const cells = [];
for (let i = 0; i < 100; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  game.appendChild(cell);
  cells.push(cell);
}

let snake = [];
let direction = 1;
let food = 0;
let interval = 300;
let gameLoop;

function draw() {
  cells.forEach((cell, i) => {
    cell.className = "cell";
    if (snake.includes(i)) cell.classList.add("snake");
    if (i === food) cell.classList.add("food");
  });
}

function placeFood() {
  do {
    food = Math.floor(Math.random() * 100);
  } while (snake.includes(food));
}

function move() {
  const head = snake[0];
  const newHead = head + direction;

  if (
    newHead < 0 ||
    newHead >= 100 ||
    (direction === 1 && head % 10 === 9) ||
    (direction === -1 && head % 10 === 0) ||
    snake.includes(newHead)
  ) {
    clearInterval(gameLoop);
    alert("End");
    return;
  }

  snake.unshift(newHead);

  if (newHead === food) {
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}


document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (key === "w" && direction !== 10) direction = -10;
  else if (key === "s" && direction !== -10) direction = 10;
  else if (key === "a" && direction !== 1) direction = -1;
  else if (key === "d" && direction !== -1) direction = 1;
});

startButton.addEventListener("click", () => {
  const startIndex = parseInt(startCellInput.value);

  if (isNaN(startIndex) || startIndex < 0 || startIndex > 99) {
    alert("0-99");
    return;
  }

  snake = [startIndex];
  direction = 1;
  placeFood();
  draw();

  startScreen.style.display = "none";
  gameContainer.style.display = "flex";

  gameLoop = setInterval(move, interval);
});
