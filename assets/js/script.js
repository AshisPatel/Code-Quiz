// Initialize each section as a DOM-element to be able to manipulate visibility
const welcomePanelEl = document.getElementById("welcome-panel");
const questionPanelEl = document.getElementById("question-panel");
const scoreSubmitPanelEl = document.getElementById("score-submit-panel");
const highscorePanelEl = document.getElementById("highscore-panel");
const headerEl = document.querySelector("header");
// Initailize buttons
const startButtonEl = document.querySelector("#start-btn"); 
const returnButtonEl = document.querySelector("#return-btn"); 
const clearButtonEl = document.querySelector("#clear-btn");
const scoreboardEl = document.querySelector("#scoreboard");  
// Grab question-title and answer-list elements to populate with quiz questions & answers
const questionTitleEl = document.querySelector("#question-title");
const answerListEl = document.querySelector("#answer-list");
// Grab highscore list to populate with highscores
const highscoreListEl = document.querySelector("#highscore-list");
// Grab timer div
const timerEl = document.querySelector("#timer-box");


// Initialize boolean to check if the timer needs to continue counting down 
let timerContinue = true;
// Initialize total time user has to take the quiz; 
let totalTime = 60;
// Initialize question count 
let quesNum = 0;
// Initialize score counter
let score = 0;
// Initailize empty array to hold highscores
let highscores = []; 
// Initialize object containing questions - questions & answers from the Week 4 Challenge Preview
const questions = [{
    title: "Commonly used data types DO NOT include:", answers: ["strings", "booleans", "alerts", "numbers"]
    , correctAnswer: "alerts"
}, { title: "The condition in an if / else statement is enclosed with what?", answers: ["quotes", "curly brackets", "parenthesis", "square brackets"], correctAnswer: "parenthesis" },
{ title: "Arrays in JavaScript can be used to store what?", answers: ["numbers and strings", "other arrays", "booleans", "all of the above"], correctAnswer: "all of the above" },
{ title: "A very useful tool used during development and debugging for printing content to the debugger is:", answers: ["JavaScript", "terminal/bash", "for loops", "console.log"], correctAnswer: "console.log" }];

// Create a function to generate the questions 
const generateQuestion = function () {
    // Set question-title 
    questionTitleEl.textContent = questions[quesNum].title;
    // Grab the answers key in the questions array of objects
    let questionAnswers = questions[quesNum].answers;
    // For each used to run through answers array and generate buttons for each answer
    questionAnswers.forEach(questionAnswer => {
        const answerEl = document.createElement("button");
        const answerHolderEl = document.createElement("li");
        
        answerEl.className = "btn";
        answerEl.textContent = questionAnswer;
        answerHolderEl.appendChild(answerEl);
        answerListEl.appendChild(answerHolderEl);
    });
    // Increment quesNum to move on to next question next time function is called 
    quesNum++;
}

// Create a function that will increase the score for correct answers and the timer
const checkAnswer = function () {
    // If the user gets the question correct, add 10 points
    const answerFeedBackEl = document.querySelector("#feedback"); 
    if (event.target.textContent === questions[quesNum - 1].correctAnswer) {
        score = score + 10;
        answerFeedBackEl.textContent = "Correct! (^u^)b";
    }
    // If the user gets the question wrong, remove 10 seconds from the timer
    else if (totalTime > 10) {
        totalTime = totalTime - 10;  
        timerEl.textContent = `Time Left: ${totalTime}`;
        answerFeedBackEl.textContent = "Wrong! (`n`)";
    }
    // If the user gets the question wrong, and there are less than 10 seconds remaining from the timer end quiz 
    else {
        totalTime = 0;
        timerEl.textContent = `Time Left: ${totalTime}`;
        questionPanelEl.className = "hide";
        scoreSubmitPanelEl.className = "panel"; 
        answerFeedBackEl.textContent = "Wrong! (`n`)";
    }
    // Remove feedback text after 0.75 seconds
    const removeFeedbackText = setTimeout(function(){ 
        answerFeedBackEl.textContent = "";
    }, 750);
     
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
            questionPanelEl.className = "hide";
            scoreSubmitPanelEl.className = "panel"; 
            clearInterval(timer);
        }
    }, 1000);
}

// Create function that will transition from the 'Welcome Page' over to the quiz
const startQuizHandler = function () {
    // Hide the welcome panel 
    welcomePanelEl.className = "hide";
    // Start timer 
    countDown();
    // Reveal question panel
    questionPanelEl.className = "panel"; 
    generateQuestion();
}

// Create function that will transition to the next question once the quiz has begun 
const nextQuestionHandler = function (event) {
    // If the element that is clicked in the list is a button representing an answer, and it is not the last question of the quiz, generate the next question 
    if (event.target.matches(".btn") && quesNum != questions.length) {
        // Check to see if right answer was selected and score needs to be increased 
        checkAnswer();
        // Removes old answers 
        answerListEl.textContent = "";
        generateQuestion();
    }
    // If the answer is clicked and it is the last question, transition to the score submit
    else if (event.target.matches(".btn") && quesNum === questions.length) {

        // Check to see if right answer was selected and score needs to be increased 
         checkAnswer();
        // Stop timer and add remaining time to score 
        timerContinue = false;
        score = totalTime + score; 
        // Hide the question panel and reveal score submit panel 
        questionPanelEl.className = "hide";
        scoreSubmitPanelEl.className = "panel"; 
   
        const finalScoreEl = document.querySelector("#final-score"); // ...getElementbyId doesn't work with span?
        finalScoreEl.textContent = `Your final score was: ${score}`;
        // Add user's initials and score to an object to store in the localStorage
    }
}

// Create a function that will transition to the highscore screen 
const highScoreHandler = function (event) {
    // Prevent refresh on submit
    event.preventDefault();
    // Hide score submit panel and reveal highscore panel if the user gives their initials, if input text is blank, do not transition to highscore
    var initial = document.querySelector("input[name='initials']").value 
    if ( initial === "")
    {
        alert("Please enter your initials to submit your score!"); 
    }
    // If initials are input, store initial and score, hide score submit panel, show highscore panel
    else {
        // create object to hold initial and score, and then add to highscores array to store in localStorage 
        let highscore = {initials: initial,
             highscore: score};
        highscores.push(highscore); 
        localStorage.setItem("highscores", JSON.stringify(highscores)); 
        // Panel transition
        loadHighscores(); 
        scoreSubmitPanelEl.className = "hide";
        headerEl.className = "hide"; 
        highscorePanelEl.className = "panel";
    }
}

// Create a function to load previously saved highscores
const loadHighscores = function() {
    // Clear old list 
    highscoreListEl.textContent = ""; 
    // Get highscores from localStorage
    let savedHighscores = localStorage.getItem("highscores");
    // Verify the highscores is not an empty array, if it is exit function else retrieve
    if (!savedHighscores) {
        return false; 
    }
    savedHighscores = JSON.parse(savedHighscores); 
    highscores = savedHighscores; // Updates our empty array to contain previous data
    // sort highscores from highest score to least 
    highscores.sort((a,b) => {
        return b.highscore - a.highscore; 
    });
    // Creates list of highscores from the stored object 
    savedHighscores.forEach(highscore => {
        const highscoreListItemEl = document.createElement("li");
        highscoreListItemEl.textContent = `${highscore.initials} - ${highscore.highscore}`; 
        highscoreListEl.appendChild(highscoreListItemEl); 
    })
}

//

// Create a function to hide other content, and stop quiz if scoreboard is clicked
const scoreboardHandler = function () {
    // End timer if the the button was clicked mid quiz
    timerContinue = false; 
    // Hide both welcome, question, and header panel and reveal highscore panel
    welcomePanelEl.className = "hide";
    questionPanelEl.className = "hide";
    headerEl.className = "hide"; 
    highscorePanelEl.className = "panel"; 
    // Call loadHighscores function 
    loadHighscores(); 

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
// Clear highscores from list and localStorage on click 
clearButtonEl.addEventListener("click", function () {
    highscoreListEl.textContent = "";  
    localStorage.clear();
});

scoreboardEl.addEventListener("click", scoreboardHandler)

// Call load highscores 
loadHighscores();

// Set timer based on set totalTime on page load 
timerEl.textContent = `Time Left: ${totalTime}`; 