

const startBtn = document.getElementById('start-btn');
const submitBtn = document.getElementById('submit-btn');
const questionContainer = document.getElementById('question');
const answerInput = document.getElementById('answer-input');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let timer;
let timeLeft = 30;
let score = 0;
let currentQuestion = {};
let difficulty = 1;


function generateQuestion() {
  const numCount = difficulty > 1 ? Math.floor(Math.random() * 2) + 2 : 2;
  const numbers = Array.from({ length: numCount }, () => Math.floor(Math.random() * (10 * difficulty)) + 1);
  const operators = ['+', '-', '*', '/'];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  const question = numbers.join(` ${operator} `);
  const answer = eval(question).toFixed(2); // Keep precision for division
  return { question, answer: parseFloat(answer) };
}


function startGame() {
  score = 0;
  timeLeft = 30;
  difficulty = 1;
  updateScore();
  updateTimer();
  nextQuestion();

  startBtn.disabled = true;
  answerInput.disabled = false;
  submitBtn.disabled = false;

  timer = setInterval(() => {
    timeLeft -= 1;
    updateTimer();
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function nextQuestion() {
  currentQuestion = generateQuestion();
  questionContainer.textContent = `Solve: ${currentQuestion.question}`;
  answerInput.value = '';
}

function checkAnswer() {
  const userAnswer = parseFloat(answerInput.value);
  if (userAnswer === currentQuestion.answer) {
    score += difficulty * 10;
    difficulty += 0.5; // Increase difficulty gradually
    updateScore();
    nextQuestion();
  } else {
    questionContainer.textContent = 'Wrong! Try another one.';
    nextQuestion();
  }
}


function endGame() {
  clearInterval(timer);
  questionContainer.textContent = `Game Over! Final Score: ${score}`;
  startBtn.disabled = false;
  answerInput.disabled = true;
  submitBtn.disabled = true;
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function updateTimer() {
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;
}


startBtn.addEventListener('click', startGame);
submitBtn.addEventListener('click', checkAnswer);
