let timer;
let timeLeft = 30;
let score = 0;
let correctAnswers = 0;
const maxScore = 10;

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showResult("Game over. Time's up!");
            resetGame();
        }
    }, 1000);
}

function resetGame() {
    timeLeft = 30;
    score = 0;
    correctAnswers = 0;
    document.getElementById("score").textContent = `Score: ${score}`;
    document.getElementById("correctAnswers").textContent = `Correct answers: ${correctAnswers} / ${maxScore}`;
    document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
    generateQuestion();
    startTimer();
    document.getElementById("result").textContent = '';
}

function generateQuestion() {
    const difficulty = correctAnswers + 1; 
    const num1 = Math.floor(Math.random() * (100 * difficulty)) + 1; 
    const num2 = Math.floor(Math.random() * (10 * difficulty)) + 1;
    const operators = ['+', '-', '*', '/','+','+','+','-','+','-','+','*','+','-','+'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let questionText = '';
    let correctAnswer = 0;

    switch (operator) {
        case '+':
            questionText = `What is ${num1} + ${num2}?`;
            correctAnswer = num1 + num2;
            break;
        case '-':
            questionText = `What is ${num1} - ${num2}?`;
            correctAnswer = num1 - num2;
            break;
        case '*':
            questionText = `What is ${num1} * ${num2}?`;
            correctAnswer = num1 * num2;
            break;
        case '/':
            questionText = `What is ${num1} / ${num2}?`;
            correctAnswer = (num1 / num2).toFixed(2);
            break;
    }

    document.getElementById("question").textContent = questionText;
    document.getElementById("question").dataset.answer = correctAnswer;
}

function showResult(message) {
    const resultBox = document.getElementById("result");
    resultBox.textContent = message;
    resultBox.style.color = message.includes("Congratulations") ? "green" : "red";
}

document.getElementById("submit").addEventListener("click", () => {
    const userAnswer = parseFloat(document.getElementById("answer").value);
    const correctAnswer = parseFloat(document.getElementById("question").dataset.answer);

    if (userAnswer === correctAnswer) {
        score++;
        correctAnswers++;
        timeLeft = 30;  
        document.getElementById("score").textContent = `Score: ${score}`;
        document.getElementById("correctAnswers").textContent = `Correct answers: ${correctAnswers} / ${maxScore}`;
        generateQuestion();

        if (score >= maxScore) {
            clearInterval(timer);
            showResult("Congratulations! You've completed the quiz.");
            resetGame();
        }
    } else {
        clearInterval(timer);
        showResult("Wrong answer! Game over.");
        resetGame();
    }

    document.getElementById("answer").value = "";
});

document.addEventListener("DOMContentLoaded", () => {
    generateQuestion();
    startTimer();
});
