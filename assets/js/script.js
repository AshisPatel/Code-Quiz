// Initailize variable for submit button to start quiz 
const startButtonEl = document.querySelector("#start-quiz");
// Grab h1 as question-line
const h1El = document.querySelector("#welcome-title"); 
// Grab div.list-wrap as the holder for the answers
const welcomeTextEl = document.querySelector("#welcome-text"); 
const answerListEl = document.querySelector("#answer-list");
// Initialize question count 
let quesNum = 0; 
// Initialize object containing questions
const questions = [{title: "Question 1: THIS IS A TEST", answers: ["a","b","c","d"]
}, {title: "Question 2: THIS IS A PASTA", answers: ["e", "f", "g", "h"]}, 
{title: "Question 3", answers: ["i","j","k","l"]},
{title: "Question 4", answers: ["m", "n", "o", "p"]}]; 

// Create a function to generate the questions 
function generateQuestion() {
    // Set h1 equal to the questions title 
    h1El.textContent = questions[quesNum].title;
    // Iterate through the questions object and add answers 
    for(let i = 0; i < questions[quesNum].answers.length; i++) {
        const answerEl = document.createElement("button"); 
        const answerHolderEl = document.createElement("li");

        answerEl.className = "answer"; 
        answerEl.textContent = questions[quesNum].answers[i];

        answerHolderEl.appendChild(answerEl);
        answerListEl.appendChild(answerHolderEl);
        //console.log(answerListEl); why does ths console log show me the same list each iteration? 
    }
    // Increment quesNum to move on to next question next time function is called 
    quesNum++; 
}

// Create function that will transition from the 'Welcome Page' over to the quiz
const startQuizHandler = function(event) {
    // Hide welcome screen interface once questions
    welcomeTextEl.remove();
    startButtonEl.remove(); 
    // For each item in answers key, add a button and then append the button to a list item that is appended in the ordered list under the question
    generateQuestion(); 
}

// Create function that will transition to the next question once the quiz has begun 
const nextQuestionHandler = function(event) {
    // If the element that is clicked in the list is a button representing an answer, and it is not the last question of the quiz, generate the next question 
    if (event.target.matches(".answer") && quesNum != questions.length) {
        // Removes old answers 
        answerListEl.textContent = ""; 
        generateQuestion(); 
    }
}

// Change welcome interface to the first question of the quiz when the start button is clicked
startButtonEl.addEventListener("click", startQuizHandler); 
// Once an answer is clicked, dynamically generate the next question 
answerListEl.addEventListener("click", nextQuestionHandler)