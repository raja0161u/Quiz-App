const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "India's largest city by population ?",
    answers: [
      { text: "Delhi", correct: false },
      { text: "Mumbai", correct: true },
      { text: "Chennai", correct: false },
      { text: "Pune", correct: false },
    ],
  },
  {
    question: "what is the name of india's national aquatic animal ?",
    answers: [
      { text: "Green Frog", correct: false },
      { text: "River Dolphin", correct: true },
      { text: "Susu", correct: true },
      { text: "Crocodile", correct: false },
    ],
  },
  {
    question: "What is the full name of Dr. Abdul Kalam ?",
    answers: [
      { text: "Avul Jakir Jalaluddin Kalam", correct: false },
      { text: "Avul Pakir Jainulabdeen Abdul Kalam", correct: true },
      { text: "Abdul Sakir Jainulabdeen Kalam", correct: false },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "biggest district in india ?",
    answers: [
      { text: "Jodhpur, Rajasthan", correct: false },
      { text: "Ganjam,Odisha", correct: false },
      { text: "Kachchh,Gujarat", correct: true },
      { text: "Leh, Jammu and Kashmir", correct: false },
    ],
  },
];
