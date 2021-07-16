// Initailize variable for submit button to start quiz 
const startButtonEl = document.querySelector("#start-quiz");
// Grab h1 as question-line
const h1El = document.querySelector("#welcome-title");
// Grab div.list-wrap as the holder for the answers
const contentTextEl = document.querySelector("#content-text");
const answerListEl = document.querySelector("#answer-list");
const endFormEl = document.querySelector("#end-form");
const timerEl = document.querySelector(".timer-box");
// Initialize boolean to check if the timer needs to continue counting down 
let timerContinue = true;
// Initialize total time user has to take the quiz; 
let totalTime = 60;
// Initialize question count 
let quesNum = 0;
// Initialize score counter
let score = 0;
// Initialize object containing questions
const questions = [{
    title: "Question 1", answers: ["a", "b", "c", "d"]
    , correctAnswer: "a"
}, { title: "Question 2", answers: ["e", "f", "g", "h"], correctAnswer: "f" },
{ title: "Question 3", answers: ["i", "j", "k", "l"], correctAnswer: "l" },
{ title: "Question 4", answers: ["m", "n", "o", "p"], correctAnswer: "o" }];

// Create a function to generate the questions 
const generateQuestion = function () {
    // Set h1 equal to the questions title 
    h1El.textContent = questions[quesNum].title;
    // Iterate through the questions object and add answers 
    for (let i = 0; i < questions[quesNum].answers.length; i++) {
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

// Create a function that will increase the score for correct answers and the timer

const checkAnswer = function () {
    // If the user gets the question correct, add 10 points
    if (event.target.textContent === questions[quesNum - 1].correctAnswer) {
        score = score + 10;
        console.log(score);
    }
    // If the user gets the question wrong, remove 10 seconds from the timer
    else if (totalTime > 10) {
        totalTime = totalTime - 10; 
    }
    else {
        totalTime = 0; 
    }
}

// Create function that when called will start countdown timer -> include in start quiz handler
const countDown = function () {

    const timer = setInterval(function () {
        // If time is remaining and the user has not completed the quiz, countdown
        if (totalTime > 0 && timerContinue) {
            totalTime--;
            timerEl.textContent = (`Time Left: ${totalTime}`);
        }
        // If the user has completed the quiz, end countdown and add time left to score
        else if (!timerContinue) {
            clearInterval(timer);
        }
        // If the user runs out of time before the quiz is complete, take the user to the submit score form
        else {
            timerEl.textContent = "Time Left: 0";
            totalTime = 0;
            timeLeft = false;
            hiScoreHandler(); // doesn't work
            clearInterval(timer);
        }
    }, 1000);
}

// Create function that will transition from the 'Welcome Page' over to the quiz
const startQuizHandler = function (event) {
    questNum = 0;
    // Hide welcome screen interface once questions
    contentTextEl.textContent = "";
    startButtonEl.remove();
    // For each item in answers key, add a button and then append the button to a list item that is appended in the ordered list under the question
    countDown();
    generateQuestion();
}

// Create function that will transition to the next question once the quiz has begun 
const nextQuestionHandler = function (event) {
    // If the element that is clicked in the list is a button representing an answer, and it is not the last question of the quiz, generate the next question 

    console.log(event.target);
    if (event.target.matches(".answer") && quesNum != questions.length) {
        // Check to see if right answer was selected and score needs to be increased 
        checkAnswer();
        // Removes old answers 
        answerListEl.textContent = "";
        generateQuestion();
    }
    // If the answer is clicked and it is the lat question, transition to the score submit
    else if (event.target.matches(".answer") && quesNum === questions.length) {

        //event.preventDefault();
        // Quiz is completed, timer no longer needs to countdown 
        timerContinue = false;
        score = totalTime + score; 
        // Check to see if right answer was selected and score needs to be increased 
        checkAnswer();

        // We need to prevent the default function of the enter key here
        answerListEl.remove();
        h1El.textContent = "QUIZ COMPLETE";
        contentTextEl.textContent = "Congratulations, you're done!";

        let initialInputEl = document.createElement("input");
        let submitButtonEl = document.createElement("button");
        let finalScoreEl = document.createElement("div");

        initialInputEl.setAttribute("type", "text");
        initialInputEl.setAttribute("name", "initials");
        initialInputEl.setAttribute("placeholder", "Please enter your initials");

        submitButtonEl.setAttribute("type", "submit");
        submitButtonEl.id = "submit-initials-btn";
        submitButtonEl.textContent = "Submit";

        finalScoreEl.textContent = "Your final score was: " + score;
        
        // Add user's initials and score to an object to store in the localStorage

        endFormEl.appendChild(initialInputEl);
        endFormEl.appendChild(submitButtonEl);
        endFormEl.appendChild(finalScoreEl);
    }
}

// Create a function that will transition to the hiScore screen 
const highScoreHandler = function (event) {

    event.preventDefault();
    console.log(initialInputEl.value);
    h1El.textContent = "Highscores:"
    contentTextEl.textContent = "";
    //endFormEl.remove();
    console.log(document);

    const retryButtonEl = document.createElement("button");
    const clearHiScoreButtonEl = document.createElement("button");

    retryButtonEl.textContent = "Return";
    retryButtonEl.id = "return-btn";
    clearHiScoreButtonEl.textContent = "Clear hiscores";

    contentTextEl.appendChild(retryButtonEl);
    contentTextEl.appendChild(clearHiScoreButtonEl);

    // Display hiscore list from localStorage

    // Display two buttons to allow the user to refresh the page or clear the hiscores

    // Refresh button
}
// Create a function that will refresh the page if the Retry button is clicked on the hiscores screen 
const returnHandler = function (event) {
    if (event.target.matches("#return-btn")) {
        window.location.reload();
    }
}

// Change welcome interface to the first question of the quiz when the start button is clicked
startButtonEl.addEventListener("click", startQuizHandler);
// Once an answer is clicked, dynamically generate the next question 
answerListEl.addEventListener("click", nextQuestionHandler);
// After the user submits their initials, generate hiscore screen 
// Look for retry button click
contentTextEl.addEventListener("click", returnHandler);
// Disable the enter button default functionality
endFormEl.addEventListener("submit", highScoreHandler); 

