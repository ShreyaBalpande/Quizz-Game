let currentQuestionIndex = 0;
let score = 0;
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress");
const resultElement = document.getElementById("result");
const totalElement = document.getElementById("total");
const feedbackElement = document.getElementById("feedback");
const quizContainer = document.getElementById("quiz-container");
const ScoreElement = document.getElementById("score");



const questions = [
  { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: 2 },
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: 1 },
  { question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"], answer: 1 },
  { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Platinum"], answer: 2 },
  { question: "Who invented the telephone?", options: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Benjamin Franklin"], answer: 0 },
  { question: "Which country is known as the Land of the Rising Sun?", options: ["China", "Japan", "Korea", "Thailand"], answer: 1 },
  { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
  { question: "In what year did the Titanic sink?", options: ["1912", "1905", "1898", "1920"], answer: 0 },
  { question: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2", "H2"], answer: 1 },
  { question: "Who is known as the father of modern physics?", options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Marie Curie"], answer: 1 },
  { question: "What is the smallest planet in our solar system?", options: ["Mercury", "Mars", "Venus", "Earth"], answer: 0 },
  { question: "Which element has the chemical symbol 'O'?", options: ["Oxygen", "Osmium", "Ozone", "Opium"], answer: 0 },
  { question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: 1 },
  { question: "Which animal is known as the King of the Jungle?", options: ["Lion", "Tiger", "Elephant", "Bear"], answer: 0 },
  { question: "What is the capital city of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], answer: 2 },
  { question: "What year did World War I begin?", options: ["1912", "1914", "1918", "1922"], answer: 1 },
  { question: "Who is the author of 'Harry Potter'?", options: ["J.R.R. Tolkien", "J.K. Rowling", "George R.R. Martin", "Suzanne Collins"], answer: 1 },
  { question: "What is the largest mammal on Earth?", options: ["Elephant", "Blue Whale", "Shark", "Giraffe"], answer: 1 },
  { question: "Which element is essential for photosynthesis in plants?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: 1 }
];

// Initialize game
ScoreElement.textContent = score;
totalElement.textContent = questions.length;
loadQuestion();

// Load question and options
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";
  feedbackElement.innerHTML = ""; // Clear previous feedback
  currentQuestion.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => selectOption(index, currentQuestion.answer);
    optionsElement.appendChild(li);
  });
  nextButton.disabled = true;
  progressBar.style.width = ((currentQuestionIndex / questions.length) * 100) + "%";
}

// Handle option selection
function selectOption(selectedIndex, correctAnswerIndex) {
  const options = document.querySelectorAll("#options li");

  options.forEach((option, index) => {
    if (index === correctAnswerIndex) {
      option.style.background = "#4caf50"; // Correct answer color (green)
      option.style.color = "white";
    } else if (index === selectedIndex) {
      option.style.background = "#f44336"; // Incorrect answer color (red)
      option.style.color = "white";
    }
  });

  // Show on-screen feedback without alert
  if (selectedIndex !== correctAnswerIndex) {
    feedbackElement.innerHTML = `<p style="color: red;">Incorrect! The correct answer is: ${questions[currentQuestionIndex].options[correctAnswerIndex]}</p>`;
  } else {
    score++;
    feedbackElement.innerHTML = `<p style="color: green;">Correct!</p>`;
  }

  nextButton.disabled = false;
}

// Move to the next question
nextButton.onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showFinalScore();
  }
};

// Show the final score
function showFinalScore() {
  questionElement.textContent = "Quiz Over!";
  optionsElement.innerHTML = ""; // Clear options
  feedbackElement.innerHTML = ""; // Clear feedback
  resultElement.style.display = "block";
  resultElement.innerHTML = `<p>Your score: ${score}/${questions.length}</p>`;
  nextButton.textContent = "Restart";
  nextButton.onclick = resetGame; // Change "Next" button to restart the game
}

// Start a new game
function resetGame() {
  currentQuestionIndex = 0;
  score = 0;
  resultElement.style.display = "none"; // Hide the result element
  nextButton.textContent = "Next"; // Restore button text
  loadQuestion();
  location.reload();
}
