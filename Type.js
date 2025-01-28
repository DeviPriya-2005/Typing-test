
const textDisplay = document.getElementById("text-display");
const textInput = document.getElementById("text-input");
const startBtn = document.getElementById("start-btn");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "JavaScript is a versatile programming language.",
  "Typing speed tests are a great way to improve accuracy.",
  "Frontend development involves HTML, CSS, and JavaScript.",
  "Practice makes perfect when learning to code."
];

let startTime, timerInterval;
let currentText = "";
let typedChars = 0;

function startTest() {
  // Reset variables and UI
  clearInterval(timerInterval);
  textInput.value = "";
  textInput.disabled = false;
  textInput.focus();
  startTime = Date.now();
  typedChars = 0;

  currentText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
  textDisplay.textContent = currentText;

  timerDisplay.textContent = "Time: 0s";
  wpmDisplay.textContent = "WPM: 0";
  accuracyDisplay.textContent = "Accuracy: 0%";

  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  timerDisplay.textContent = `Time: ${elapsedTime}s`;

  const typedText = textInput.value;
  const wordsTyped = typedText.split(" ").filter(word => word).length;
  const wpm = Math.floor((wordsTyped / elapsedTime) * 60) || 0;
  const correctChars = getCorrectChars(typedText);
  const accuracy = ((correctChars / Math.max(currentText.length, 1)) * 100).toFixed(2);

  wpmDisplay.textContent = `WPM: ${wpm}`;
  accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;

  if (typedText === currentText) {
    endTest();
  }
}

function getCorrectChars(typedText) {
  let correctCount = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === currentText[i]) {
      correctCount++;
    }
  }
  return correctCount;
}

function endTest() {
  clearInterval(timerInterval);
  textInput.disabled = true;
}

startBtn.addEventListener("click", startTest);
textInput.addEventListener("input", () => {
  typedChars = textInput.value.length;
});
