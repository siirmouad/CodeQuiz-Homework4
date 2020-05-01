//create variables
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
  {
    question: "Where Barney and Ted first met?",
    choiceA: "The bars restroom",
    choiceB: "Strip club",
    choiceC: "Church",
    correct: "A",
  },
  {
    question: "when Lily broke up with Marshall, where did she went to?",
    choiceA: "San Diego",
    choiceB: "San Francisco",
    choiceC: "Boston",
    correct: "B",
  },
  {
    question: "Where is Robin from",
    choiceA: "France",
    choiceB: "UK",
    choiceC: "Canada",
    correct: "C",
  },
  {
    question: "Who is the mother?",
    choiceA: "Robin",
    choiceB: "Tracey",
    choiceC: "Victoria",
    correct: "B",
  },
];

// create variable last question is the third one in this case
var lastQuestion = questions.length - 1;
let runningQuestion = 0;
// create variable to let the countdown  start from Zero for every question
let count = 0;
//create a time variable of 10 seconds per question
var questionTime = 15;
// create a variable for the countdown timer gauge
var gaugeWidth = 150; // 150px
// in this one we are styling the timer gauge to change with every seconds
var gaugeUnit = gaugeWidth / questionTime;

// create score variable
var score = 0;
var TIMER;

// render a question
function renderQuestion() {
  //create var q stand from question
  var q = questions[runningQuestion];
  question.innerHTML = "<p>" + q.question + "</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}
// Create an event listener when the user click fire up the startQuiz function
start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  //start the Counter from zero
  renderCounter();

  // to call renderCounter every 1000 ms = 1s
  TIMER = setInterval(renderCounter, 1000);
}

// create Progress forLoop to go through all the four questions from the array
function renderProgress() {
  for (var q = 0; q < questions.length; q++) {
    //return the innerHTML property
    progress.innerHTML += "<div class='prog' id=" + q + "></div>";
    //I was trying to use appendChild but I couldn't make it work
    //renderProgress.appendChild(questions);
  }
}

// counter render

function renderCounter() {
  //if the count is less or equal to 15 seconds
  if (count <= questionTime) {
    counter.innerHTML = count;
    //in this one we are styling the btimeGauge; if count = 0 the width = 0 if count =1 the width = 10px which is 150px/15seconds
    timeGauge.style.width = count * gaugeUnit + "px";
    count++;
  } else {
    //if count is 0 that's mean the user didn't answer the question
    count = 0;
    // change progress color to red
    answerIsWrong();
    if (runningQuestion < lastQuestion) {
      //if the running question is less than the last question we should move to the next question
      runningQuestion++;
      renderQuestion();
    } else {
      //if the running question is equal or bigger than lastQuestion we should clear the Timer and Show the score
      clearInterval(TIMER);
      scoreRender();
    }
  }
}

// checkAnwer

function checkAnswer(answer) {
  if (questions[runningQuestion].correct === answer) {
    // answer is correct we will add one to the score
    score++;
    // if the answer is correct change progress color to green
    document.getElementById(runningQuestion).style.backgroundColor = "green";
  } else {
    //if the answer is wrong change progress color to red
    document.getElementById(runningQuestion).style.backgroundColor = "red";
  }
  count = 0;
  if (runningQuestion < lastQuestion) {
    //if running question is less than last question we will move to the next question
    runningQuestion++;
    renderQuestion();
  } else {
    // if not will end the quiz and show the score
    clearInterval(TIMER);
    scoreRender();
  }
}

// function to Calculate the final Score
function scoreRender() {
  scoreDiv.style.display = "block";

  // calculate the amount of question percent answered by the user
  var scorePerCent = Math.round((100 * score) / questions.length);
  //Show the percentage
  scoreDiv.innerHTML = "<p>" + scorePerCent + "%</p>";
  scoreRender.appendChild(scorePerCent);
}
