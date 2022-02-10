const wordBlanks = document.querySelector(".word-blanks");
const win = document.querySelector(".win");
const loss = document.querySelector(".lose");
const timerElement = document.querySelector(".timer-count");
const startButton = document.querySelector(".start-button");
const resetButton = document.querySelector(".reset-button");

let chosenWord = "";
let numBlanks = 0;
let winCounter = 0;
let lossCounter = 0;
let isWin = false;
let timer;
let timerCount;

const words = [
  "a town",
  "breck",
  "cap hill",
  "dtc",
  "foco",
  "gunny",
  "lodo",
  "mile high",
  "broncos",
  "rockies",
  "avalalnche",
  "blucifer",
  "flatlander",
  "casa bonita",
  "the springs",
  "green mile",
  "native",
  "transplant",
  "pfm",
  "orange crush",
  "mile high salute",
  "up the hill",
  "rockpile",
  "aspen",
  "boulder",
  "centennial state",
  "estes park",
  "mile high city",
  "fourteener",
  "subie",
  "red rocks",
  "pikes peak",
  "mountains to the west",
  "craft beer",
  "john elway",
  "champ bailey",
  "von miller",
  "shannon sharpe",
  "steve atwater",
  "terrell davis",
  "rod smith",
  "peyton manning",
  "ed maccaffery",
  "demaryius thomas",
  "todd helton",
  "nolan arenado",
  "matt holiday",
  "vinny castilla",
  "larry walker",
  "dante bichette",
  "carlos gonzales",
  "troy tulowitzki",
  "andres galarraga",
  "charlie blackmon",
  "ubaldo jiminez",
  "ellis burks",
  "dexter fowler",
  "joe sakic",
  "milan hejduk",
  "adam foote",
  "peter forsberg",
  "patrick roy",
  "rob blake",
  "ray bourque",
  "alex tanguay",
  "dikembe mutombo",
  "alex english",
  "dan issel",
  "carmelo anthony",
  "chauncey billups",
  "nene",
  "kenyon martin",
  "allen iverson",
  "jr smith",
  "ty lawson",
  "gary harris",
  "nikola jokic",
  "tim allen",
  "kristin davis",
  "john carroll lynch",
  "lindsey vonn",
  "don cheadle",
  "hattie mcdaniel",
  "dave logan",
  "dalton risner",
  "rocky mountain national park",
  "vail",
  "garden of the gods",
  "colorado national monument",
  "stanley hotel",
  "black canyon of the gunnison national park",
  "great sand dunes national park",
  "mesa verde national park",
  "denver",
  "aurora",
  "colorado springs",
  "fort collins",
  "lakewood",
  "littleton",
  "highlands ranch",
  "western tiger salamander",
  "rocky mountain bighorn sheep",
  "lark bunting",
  "greenback cutthroat trout",
  "rocky mountain columbine",
  "colorado blue spruce",
  "hanging lake",
  "new belgium brewing company",
  "keystone",
  "loveland",
  "royal gorge",
  "the broadmoor",
  "edward tatum",
  "willard f libby",
  "john l hall",
  "paul romer",
  "cheeseburger",
  "rocky mountain showdown",
  "quandary peak",
  "leadville",
  "alma",
  "wynkoop brewing company",
  "coors brewery",
  "odell brewing company",
  "avery brewing company",
  "knotted root brewing company",
  "cerberus brewing co",
  "weldwerks brewing co",
  "rockslide brewery",
  "steamworks brewing",
  "breckenridge brewery",
  "upslope brewing",
  "tommy knocker brewery",
  "oskar blues",
  "golden",
  "black shirt brewing co",
  "little machine beer",
  "dry dock brewing co",
  "odd13 brewing",
  "bull and bush brewery",
  "denver beer co",
  "comrade brewing co",
  "ball arena",
  "mile high stadium",
  "mcnichols sports arena",
  "coors field",
  "dicks sporting goods park",
  "left hand brewing co",
  "trve brewing co",
  "three barrel brewing company",
  "never summer brewing co",
  "great divide brewing company",
  "outer range brewing company",
  "epic brewing co",
  "grimm brothers brewhouse",
];

let lettersInChosenWord = [];
let blankLetters = [];

const init = () => {
  getWins();
  getLosses();
};

const startGame = () => {
  isWin = false;
  timerCount = 20;

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

const startTimer = () => {
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
  }, 2000);
};

const renderBlanks = () => {
  chosenWord = words[Math.floor(Math.random() * words.length)];
  console.log(chosenWord);
  lettersInChosenWord = chosenWord.split("");
  numBlanks = lettersInChosenWord.length;
  blankLetters = [];

  for (let i = 0; i < numBlanks; i++) {
    blankLetters.push("_");
  }
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
  let letterInWord = false;

  for (let i = 0; i < numBlanks; i++) {
    if (chosenWord[i] === letter) {
      letterInWord = true;
    }
  }
  if (letterInWord) {
    for (var j = 0; j < numBlanks; j++) {
      if (chosenWord[j] === letter) {
        blankLetters[j] = letter;
      }
    }
    wordBlanks.textContent = blankLetters.join(" ");
  }
};

document.addEventListener("keydown", (event) => {
  if (timerCount === 0) {
    return;
  }

  const key = event.key.toLowerCase();
  const alphabetNumericCharacters =
    "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");

  if (alphabetNumericCharacters.includes(key)) {
    const letterGuessed = event.key;
    checkLetters(letterGuessed);
    checkWin();
  }
});

startButton.addEventListener("click", startGame);

init();

const resetGame = () => {
  winCounter = 0;
  lossCounter = 0;

  setWins();
  setLosses();
};

resetButton.addEventListener("click", resetGame);

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
