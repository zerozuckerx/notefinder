// *** VARIABLES ***
const notes = {
  whole: ["C", "D", "E", "F", "G", "A", "B"],
  enharmonics: ["C#", "Db", "D#", "Eb", "F#", "Gb", "G#", "Ab", "A#", "Bb"]
};
const strings = ["E", "A", "D", "G", "B", "e"];
let enharmonicsOn = false;
let isAutorun = false;
let autorunIntervalID;
let seconds = 5;

// *** QUERYSELECTORS ***
const display = document.querySelector(".main-display");
const randomizerButton = document.querySelector(".randomizer");
const toggleNotes = document.querySelector(".toggleNotes");
const autorunButton = document.querySelector(".autorun");
const minusButton = document.querySelector(".minus");
const plusButton = document.querySelector(".plus");

// *** FUNCTIONS ***
document.addEventListener("keypress", function(e) {
  console.log(e.keyCode) //log key
});

randomizerButton.addEventListener("click", randomize);
document.addEventListener("keypress", e => {
  if(e.keyCode === 114) { //r key
    randomize();
    randomizerButton.classList.add("button-clicked");
    setTimeout(() => randomizerButton.classList.remove("button-clicked"), 50);
  };
});

function randomize() {
  if(!enharmonicsOn) {
    randomNumber1 = Math.floor(Math.random() * notes.whole.length);
    randomNote = notes.whole[randomNumber1];
  } else {
    allNotes = notes.whole.concat(notes.enharmonics);
    randomNumber1 = Math.floor(Math.random() * allNotes.length);
    randomNote = allNotes[randomNumber1];
  }
  const randomNumber2 = Math.floor(Math.random() * strings.length);
  const randomString = strings[randomNumber2];
  display.textContent = randomNote + " on " + randomString + " string";
};

toggleNotes.addEventListener("click", toggleEnharmonics);
document.addEventListener("keypress", e => {
  e.keyCode === 101 && toggleEnharmonics() //e key
});

function toggleEnharmonics() {
  if(enharmonicsOn) {
    enharmonicsOn = false;
  } else {
    enharmonicsOn = true;
  }
  toggleNotes.classList.toggle("enharmonics-active");
};

autorunButton.addEventListener("click", autorun);
document.addEventListener("keypress", function(e) {
  e.keyCode === 32 && autorun() //space key
});

function autorun() {
  if(!isAutorun) {
    randomize();
    autorunIntervalID = setInterval(randomize, seconds*1000);
  } else {
    window.clearInterval(autorunIntervalID);
  }
  isAutorun = !isAutorun;
  autorunButton.classList.toggle("autorun-active");
};

// *** minus button ***
minusButton.addEventListener("click", minusSeconds);
document.addEventListener("keypress", e => {
  e.keyCode === 45  && minusSeconds(); //- key
});

function minusSeconds() {
  if(seconds > 1) {
    seconds -= 1
    autorunButton.innerHTML = `auto ${seconds}s`;
    if(isAutorun) {
      window.clearInterval(autorunIntervalID);
      autorunIntervalID = setInterval(randomize, seconds*1000)
    }
  }
  minusButton.classList.add("button-clicked");
  setTimeout(() => minusButton.classList.remove("button-clicked"), 50);
};

// *** plus button ***
plusButton.addEventListener("click", plusSeconds);
document.addEventListener("keypress", e => {
  e.keyCode === 43 && plusSeconds(); //+ key
});

function plusSeconds() {
  seconds += 1
  if(isAutorun) {
    window.clearInterval(autorunIntervalID);
    autorunIntervalID = setInterval(randomize, seconds*1000)
  }
  autorunButton.innerHTML = `auto ${seconds}s`;
  plusButton.classList.add("button-clicked");
  setTimeout(() => plusButton.classList.remove("button-clicked"), 80);
};
