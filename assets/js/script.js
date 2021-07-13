// Initailize variable for submit button to start quiz 
const startButton = document.querySelector("#start-quiz");
// Grab h1 as question-line
const h1El = document.querySelector("#welcome-title"); 
// Grab div.list-wrap as the holder for the answers
const answersEl = document.querySelector(".list-wrap"); 
// Initialize question count 
let quesNum = 0; 
// Initialize object containing questions
const questions = [{title: "Question 1: THIS IS A TEST", answer1: "spaghetti"
}, {title: "Question 2: THIS IS A PASTA", answer1: "tomato"}]; 

// Create function that will transition from the 'Welcome Page' over to the quiz
const showQuestion = function(event) {
    h1El.textContent = questions[quesNum].title;
    answersEl.textContent = questions[quesNum].answer1; 
    quesNum++; 
    console.log(quesNum); 
    
}

// Event listener to detect when start button has been clicked
startButton.addEventListener("click", showQuestion); 