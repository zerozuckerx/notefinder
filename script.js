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
    buttonAnimation(randomizerButton);
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

function buttonAnimation(buttonName) {
  buttonName.classList.add("button-clicked");
  setTimeout(() => buttonName.classList.remove("button-clicked"), 50);
}

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
    clearInterval(autorunIntervalID);
  }
  isAutorun = !isAutorun;
  autorunButton.classList.toggle("autorun-active");
};

// *** MINUS BUTTON ***
minusButton.addEventListener("click", minusSeconds);
document.addEventListener("keypress", e => {
  e.keyCode === 45  && minusSeconds(); //- key
});

function minusSeconds() {
  if(seconds > 1) {
    seconds -= 1
    autorunButton.innerHTML = `auto ${seconds}s`;
    if(isAutorun) {
      clearInterval(autorunIntervalID);
      autorunIntervalID = setInterval(randomize, seconds*1000)
    }
  }
  buttonAnimation(minusButton);
};

// *** PLUS BUTTON ***
plusButton.addEventListener("click", plusSeconds);
document.addEventListener("keypress", e => {
  e.keyCode === 43 && plusSeconds(); //+ key
});

function plusSeconds() {
  seconds += 1
  if(isAutorun) {
    clearInterval(autorunIntervalID);
    autorunIntervalID = setInterval(randomize, seconds*1000)
  }
  autorunButton.innerHTML = `auto ${seconds}s`;
  buttonAnimation(plusButton);
};
