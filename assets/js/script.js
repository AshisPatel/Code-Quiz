// Initialize each section as a DOM-element to be able to manipulate visibility
const welcomePanelEl = document.getElementById("welcome-panel");
const questionPanelEl = document.getElementById("question-panel");
const scoreSubmitPanelEl = document.getElementById("score-submit-panel");
const highscorePanelEl = document.getElementById("highscore-panel");
// Initailize buttons
const startButtonEl = document.querySelector("#start-btn"); 
const returnButtonEl = document.querySelector("#return-btn"); 
const clearButtonEl = document.querySelector("#clear-btn"); 
// Grab question-title and answer-list elements to populate with quiz questions & answers
const questionTitleEl = document.querySelector("#question-title");
const answerListEl = document.querySelector("#answer-list");
// Grab div.list-wrap as the holder for the answers
const timerEl = document.querySelector(".timer-box");
// Grab span where final score is located

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
    // Set question-title 
    questionTitleEl.textContent = questions[quesNum].title;
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
const startQuizHandler = function () {
    // Hide the welcome panel 
    welcomePanelEl.className = "hide";
    questNum = 0;    
    // Start timer 
    countDown();
    // Reveal question panel
    questionPanelEl.className = ""; 
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

        // Check to see if right answer was selected and score needs to be increased 
         checkAnswer();
        // Stop timer and add remaining time to score 
        timerContinue = false;
        score = totalTime + score; 
        // Hide the question panel and reveal score submit panel 
        questionPanelEl.className = "hide";
        scoreSubmitPanelEl.className = ""; 
   
        const finalScoreEl = document.querySelector("#final-score"); // ...getElementbyId doesn't work with span?
        finalScoreEl.textContent = `Your final score was: ${score}`
        // Add user's initials and score to an object to store in the localStorage
    }
}

// Create a function that will transition to the highscore screen 
const highScoreHandler = function (event) {
    // Prevent refresh on submit
    event.preventDefault();
    // Hide score submit panel and reveal highscore panel
    scoreSubmitPanelEl.className = "hide"; 
    highscorePanelEl.className = ""; 
    // Display hiscore list from localStorage

    // Display two buttons to allow the user to refresh the page or clear the hiscores

    // Refresh button
}

// Start quiz on button click 
startButtonEl.addEventListener("click", startQuizHandler);
// Once an answer is clicked, dynamically generate the next question 
answerListEl.addEventListener("click", nextQuestionHandler);
// After the user submits their initials, generate hiscore screen 
scoreSubmitPanelEl.addEventListener("submit", highScoreHandler); 
// Look for retry button click
returnButtonEl.addEventListener("click", function () {
    window.location.reload(); 
});
// Look for clear highscore button click
clearButtonEl.addEventListener("click", function () {
    localStorage.clear(); 
});