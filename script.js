// *** VARIABLES ***
const notes = {
  whole: ["C", "D", "E", "F", "G", "A", "B"],
  enharmonics: ["C#", "Db", "D#", "Eb", "F#", "Gb", "G#", "Ab", "A#", "Bb"]
};
const strings = ["E", "A", "D", "G", "B", "e"];
var enharmonicsOn = false;

// *** QUERYSELECTORS ***
const display = document.querySelector(".display");
const randomizer = document.querySelector(".randomizer");
const toggleNotes = document.querySelector(".toggleNotes");

// const notes = ["Ab", "A", "A#", "Bb", "B", "Cb", "C", "C#", "Db", "D", "Eb", "E",
//               "E#", "Fb", "F", "F#", "Gb", "G", "G#"];

// *** FUNCTIONS ***
randomizer.addEventListener("click", randomize);

function randomize() {
  if(!enharmonicsOn) {
    randomNumber1 = Math.floor(Math.random() * notes.whole.length);
    randomNote = notes.whole[randomNumber1];
  } else {
    allNotes = notes.whole;
    notes.enharmonics.forEach(note => allNotes.push(note));
    randomNumber1 = Math.floor(Math.random() * allNotes.length);
    randomNote = allNotes[randomNumber1];
  }
  const randomNumber2 = Math.floor(Math.random() * strings.length);
  const randomString = strings[randomNumber2];
  display.textContent = randomNote + " on " + randomString + " string";
}

toggleNotes.addEventListener("click", toggleEnharmonics);

function toggleEnharmonics() {
    if(enharmonicsOn) {
    toggleNotes.textContent = "enharmonics off";
    enharmonicsOn = false;
  } else {
    toggleNotes.textContent = "enharmonics on";
    enharmonicsOn = true;
    }
  }
