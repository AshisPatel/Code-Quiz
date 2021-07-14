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
}, {title: "Question 2: THIS IS A PASTA", answers: ["e", "f", "g", "h"]}]; 

// Create function that will transition from the 'Welcome Page' over to the quiz

const startQuizHandler = function(event) {
    // Hide welcome screen interface once questions
    h1El.textContent = questions[quesNum].title;
    welcomeTextEl.remove();
    startButtonEl.remove(); 
    // For each item in answers key, add a button and then append the button to a list item that is appended in the ordered list under the question
    for(let i = 0; i < questions[quesNum].answers.length; i++) {
        const answerEl = document.createElement("button"); 
        const answerHolderEl = document.createElement("li");

        answerEl.className = "answer"; 
        answerEl.textContent = questions[quesNum].answers[i];

        answerHolderEl.appendChild(answerEl);
        answerListEl.appendChild(answerHolderEl);
        //console.log(answerListEl); why does ths console log show me the same list each iteration? 
    }
    quesNum++; 
}

const nextQuestionHandler = function(event) {
    if (event.target.matches(".answer") && quesNum < questions.length) {
        for(let i = 0; i < questions[quesNum].answers.lengthl; i++) {
            h1El.textContent = questions[quesNum].title;
            quesNum++; 
        }
    }

}

// Change welcome interface to the first question of the quiz when the start button is clicked
startButtonEl.addEventListener("click", startQuizHandler); 
// Once an answer is clicked, dynamically generate the next question 
answerListEl.addEventListener("click", nextQuestionHandler)