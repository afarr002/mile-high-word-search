const wordBlanks = document.querySelector(".word-blanks");
const win = document.querySelector(".win");
const lose = document.querySelector(".lose");
const timerElement = document.querySelector(".timer-count");
const startButton = document.querySelector(".start-button");
// const resetButton = document.querySelector(".reset-button");

let chosenWord = "";
let numBlanks = 0;
let winCounter = 0;
let lossCounter = 0;
let isWin = false;
let timer;
let timerCount;

const words = [
  "above snakes",
  "among the willows",
  "bone orchard",
  "shootin iron",
  "wobblin jaw",
  "thunderation",
  "hang fire",
];
const randomWord = words[Math.floor(Math.random() * words.length)];

const lettersInChosenWord = [];
const blankLetters = [];

const init = () => {
  getWins();
  getLosses();
};

function startTime() {
  const timerCountDown = setInterval(function () {
    secondsLeft--;
    timerLocation.textContent = secondsLeft;

    if (secondsLeft <= 5) {
      timerLocation.style.fontSize = "4em";
    }

    if (secondsLeft <= 3) {
      timerLocation.style.color = "red";
    }

    if (secondsLeft < 1) {
      clearInterval(timerCountDown);
      gameEnd();
      return;
    }
  }, 1000);
}

function generateWord() {
  wordBlanks.textContent = randomWord;
}

// function gameEnd() {

// }

//event listeners

startButton.addEventListener("click", function () {
  startTime();
  generateWord();
});

resetButton.addEventListener("click", function () {
  wins = "";
  losses = "";
});

// pseudo text

// when user clicks start, word is hidden with underscores
// display the word without the letters

// how am i going to capture the key user is pressing on?
// keyPressDown, keyPressUp
// display the pressed key if it matches a letter within the chosen word
// how do i take the value of the key that was pressed and verify if its the character within the chosen word?

// how do i know when the user has won or lost?

// how do i record information to local memory for leader board?

// need to create a timer, (setInterval, clearInterval)
