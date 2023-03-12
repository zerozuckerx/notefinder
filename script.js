// *** VARIABLES ***
const notes = {
  whole: ["C", "D", "E", "F", "G", "A", "B"],
  enharmonics: ["C#", "Db", "D#", "Eb", "F#", "Gb", "G#", "Ab", "A#", "Bb"]
};
const strings = ["E", "A", "D", "G", "B", "e"];
let enharmonicsOn = false;
let isAutorun = false;
let autorunIntervalID;

// *** QUERYSELECTORS ***
const display = document.querySelector(".main-display");
const randomizer = document.querySelector(".randomizer");
const toggleNotes = document.querySelector(".toggleNotes");
const autorunButton = document.querySelector(".autorun");

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

autorunButton.addEventListener("click", autorun);
document.addEventListener("keypress", function(e) {
  if(e.keyCode === 32) {
    autorun();
  }
});

function autorun() {
  autorunButton.classList.toggle("autorun_active");
  if(!isAutorun) {
    randomize();
    autorunIntervalID = setInterval(randomize, 5000);
    isAutorun = true;
  } else {
    window.clearInterval(autorunIntervalID);
    isAutorun = false
  }
}

toggleNotes.addEventListener("click", toggleEnharmonics);
document.addEventListener("keypress", e => {
  if(e.keyCode === 101) {
    toggleEnharmonics();
  }
})

function toggleEnharmonics() {
  toggleNotes.classList.toggle("enharmonics_active");
  if(enharmonicsOn) {
    enharmonicsOn = false;
  } else {
    enharmonicsOn = true;
  }
}
