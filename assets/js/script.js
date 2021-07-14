// Initailize variable for submit button to start quiz 
const startButtonEl = document.querySelector("#start-quiz");
// Grab h1 as question-line
const h1El = document.querySelector("#welcome-title"); 
// Grab div.list-wrap as the holder for the answers
const contentTextEl = document.querySelector("#content-text"); 
const answerListEl = document.querySelector("#answer-list");
const endFormEl = document.querySelector("#end-form"); 
// Initialize question count 
let quesNum = 0; 
// Initialize object containing questions
const questions = [{title: "Question 1", answers: ["a","b","c","d"]
}, {title: "Question 2", answers: ["e", "f", "g", "h"]}, 
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
    questNum = 0; 
    // Hide welcome screen interface once questions
    contentTextEl.textContent = ""; 
    startButtonEl.remove(); 
    // For each item in answers key, add a button and then append the button to a list item that is appended in the ordered list under the question
    generateQuestion(); 
}

// Create function that will transition to the next question once the quiz has begun 
const nextQuestionHandler = function(event) {
    // If the element that is clicked in the list is a button representing an answer, and it is not the last question of the quiz, generate the next question 

    console.log(event.target); 
    if (event.target.matches(".answer") && quesNum != questions.length) {
        // Removes old answers 
        answerListEl.textContent = ""; 
        generateQuestion(); 
    }
    // If the answer is clicked and it is the lat question, transition to the score submit
    else if (event.target.matches(".answer") && quesNum === questions.length) {
        // Set up pre-form text
        //event.preventDefault(); 
        console.log(document); 
        answerListEl.remove(); 
        h1El.textContent ="QUIZ COMPLETE"; 
        contentTextEl.textContent = "Congratulations, you're done!"; 

        let initialInputEl= document.createElement("input"); 
        let submitButtonEl = document.createElement("button"); 

        initialInputEl.setAttribute("type", "text"); 
        initialInputEl.setAttribute("name", "initials");
        initialInputEl.setAttribute("placeholder", "Please enter your initials"); 

        submitButtonEl.setAttribute("type", "submit");
        submitButtonEl.id = "submit-initials-btn";
        submitButtonEl.textContent = "Submit"; 

        contentTextEl.appendChild(initialInputEl);
        contentTextEl.appendChild(submitButtonEl); 

        // endFormEl.appendChild(initialInputEl); 
        // endFormEl.appendChild(submitButtonEl); 
    }
}

// Create a function that will transition to the hiScore screen 
const hiScoreHandler = function(event) {
    if (event.target.matches("#submit-initials-btn")) {
        h1El.textContent = "Hiscores:"
        contentTextEl.textContent = ""; 

        const retryButtonEl = document.createElement("button"); 
        const clearHiScoreButtonEl = document.createElement("button");

        retryButtonEl.textContent = "Retry";
        retryButtonEl.id = "retry-btn"; 
        clearHiScoreButtonEl.textContent = "Clear hiscores";

        contentTextEl.appendChild(retryButtonEl);
        contentTextEl.appendChild(clearHiScoreButtonEl); 
    }
    // Display hiscore list from localStorage

    // Display two buttons to allow the user to refresh the page or clear the hiscores

    // Refresh button
}
// Create a function that will refresh the page if the Retry button is clicked on the hiscores screen 
const resetHandler = function (event) {
    if (event.target.matches("#retry-btn")) {
        window.location.reload(); 
    }
}

// Change welcome interface to the first question of the quiz when the start button is clicked
startButtonEl.addEventListener("click", startQuizHandler); 
// Once an answer is clicked, dynamically generate the next question 
answerListEl.addEventListener("click", nextQuestionHandler); 
// After the user submits their initials, generate hiscore screen 
contentTextEl.addEventListener("click", hiScoreHandler);
// Look for retry button click
contentTextEl.addEventListener("click",resetHandler);
