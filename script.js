const display = document.querySelector(".display");

// const notes = ["Ab", "A", "A#", "Bb", "B", "Cb", "C", "C#", "Db", "D", "Eb", "E",
//               "E#", "Fb", "F", "F#", "Gb", "G", "G#"];

const notes = {
  whole: ["C", "D", "E", "F", "G", "A", "B"],
  enharmonics: ["C#", "Db", "D#", "Eb", "Fb", "F#", "Gb", "G#", "Ab", "A#", "Bb"]
};

const strings = ["E", "A", "D", "G", "B", "e"];
const noteSelection = "whole";
function randomize() {
  if(noteSelection == "whole") {
    const randomNumber1 = Math.floor(Math.random() * notes["whole"].length);
    const randomNote = notes["whole"][randomNumber1];
  }
  const randomNumber2 = Math.floor(Math.random() * strings.length);
  const randomString = strings[randomNumber2];
  console.log(`${randomNote} on ${randomString} string`);
  display.textContent = randomNote + " on " + randomString + " string";
}
