const questionElement = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const inputs = Array.from(document.getElementsByClassName("choice-input"));
const scoreElement = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let availableQuestions = [];

// ✅ Load questions
fetch("questions.json")
  .then(res => res.json())
  .then(loadedQuestions => {
    availableQuestions = loadedQuestions;
    startGame();
  })
  .catch(err => console.error("Error loading questions:", err));

function startGame() {
  score = 0;
  getNewQuestion();
}

function getNewQuestion() {
  if (availableQuestions.length === 0) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html");
  }

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  questionElement.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
    choice.parentElement.classList.remove("correct", "incorrect");
  });

  inputs.forEach(input => input.checked = false); // reset radios
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
}

// ✅ When player selects an option
inputs.forEach(input => {
  input.addEventListener("change", e => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;

    const selectedAnswer = e.target.dataset["number"];
    const choiceContainer = e.target.parentElement;

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    choiceContainer.classList.add(classToApply);

    if (classToApply === "correct") {
      score += 10;
      scoreElement.innerText = "Score: " + score;
    }

    setTimeout(() => {
      choiceContainer.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});
