const wordBlanks = document.querySelector(".word-blanks");
const win = document.querySelector(".win");
const loss = document.querySelector(".lose");
const timerElement = document.querySelector(".timer-count");
const startButton = document.querySelector(".start-button");
// const resetButton = document.querySelector(".reset-button");

let chosenWord = "";
let numBlanks = 0;
let winCounter = 0;
let lossCounter = 0;
let isWin = false;
let letterInWord = false;
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

const startGame = () => {
  isWin = false;
  timerCount = 10;

  startButton.disabled = true;
  renderBlanks();
  startTimer();
};

const winGame = () => {
  wordBlanks.textContent = `WINNER!!
  You must be native!`;
  winCounter++;
  startButton.disabled = false;
  setWins();
};

const loseGame = () => {
  wordBlanks.textContent = "Game over, transplant.";
  lossCounter++;
  startButton.disabled = false;
  setLosses();
};

const setTimer = () => {
  timer = setInterval(() => {
    timerCount--;
    timerElement.textContent = timerCount;

    if (timerCount >= 0) {
      if (isWin && timerCount > 0) {
        clearInterval(timer);
        winGame();
      }
    }

    if (timerCount === 0) {
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
};

const renderBlanks = () => {
  chosenWord = randomWord;
  console.log(randomWord);
  lettersInChosenWord = chosenWord.split("");
  numBlanks = lettersInChosenWord.length;
  blankLetters = [];

  numBlanks.forEach(() => {
    blankLetters.push("_");
  });
  wordBlanks.textContent = blankLetters.join(" ");
};

const setWins = () => {
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
};

const setLosses = () => {
  loss.textContent = lossCounter;
  localStorage.setItem("lossCount", lossCounter);
};

const getWins = () => {
  const storedWins = localStorage.getItem("winCount");

  if (!storedWins) {
    winCounter = 0;
  } else {
    winCounter = storedWins;
  }

  win.textContent = winCounter;
};

const getLosses = () => {
  const storedLosses = localStorage.getItem("lossCount");

  if (!storedLosses) {
    lossCounter = 0;
  } else {
    lossCounter = storedLosses;
  }

  loss.textContent = lossCounter;
};

const checkWin = () => {
  if (chosenWord === blankLetters.join("")) {
    isWin = true;
  }
};

const checkLetters = (letter) => {
  numBlanks.forEach(() => {
    if (chosenWord[i] === letter) {
      letterInWord = true;
    }
  });
  if (letterInWord) {
    numBlanks.forEach(() => {
      if (chosenWord[j] === letter) {
        blankLetters[j] = letter;
      }
    });
    wordBlanks.textContent = blankLetters.join(" ");
  }
};

document.addEventListener("keydown", (event) => {
  if (timerCount === 0) {
    return;
  }

  const key = event.key.toLowerCase();
  const alphabetNumericCharacters = /^[a-zA-Z0-9]*$/;

  if (alphabetNumericCharacters.includes(key)) {
    const letterGuessed = event.key;
    checkLetters(letterGuessed);
    checkWin();
  }
});

startButton.addEventListener("click", startGame);

init();

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
