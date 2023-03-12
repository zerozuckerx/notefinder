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
const randomizer = document.querySelector(".randomizer");
const toggleNotes = document.querySelector(".toggleNotes");
const autorunButton = document.querySelector(".autorun");
const minusButton = document.querySelector(".minus");
const plusButton = document.querySelector(".plus");

// const notes = ["Ab", "A", "A#", "Bb", "B", "Cb", "C", "C#", "Db", "D", "Eb", "E",
//               "E#", "Fb", "F", "F#", "Gb", "G", "G#"];

// *** FUNCTIONS ***
randomizer.addEventListener("click", randomize);
document.addEventListener("keypress", e => {
  if(e.keyCode === 114) {
    randomize();
  }
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
}

toggleNotes.addEventListener("click", toggleEnharmonics);
document.addEventListener("keypress", e => {
  if(e.keyCode === 101) {
    toggleEnharmonics();
  }
})

function toggleEnharmonics() {
  if(enharmonicsOn) {
    enharmonicsOn = false;
  } else {
    enharmonicsOn = true;
  }
  toggleNotes.classList.toggle("enharmonics_active");
}

autorunButton.addEventListener("click", autorun);
document.addEventListener("keypress", function(e) {
  if(e.keyCode === 32) {
    autorun();
  }
  console.log(e.keyCode);
});

function autorun() {
  if(!isAutorun) {
    randomize();
    autorunIntervalID = setInterval(randomize, seconds*1000);
    isAutorun = true;
  } else {
    window.clearInterval(autorunIntervalID);
    isAutorun = false
  }
  autorunButton.classList.toggle("autorun_active");
}

minusButton.addEventListener("click", minusSeconds);

function minusSeconds() {
  if(seconds > 1) {
    seconds -= 1
    autorun();
    autorunButton.innerHTML = `auto ${seconds}s`;
  } else {
    return
  }
}
