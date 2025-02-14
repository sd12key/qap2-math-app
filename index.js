const express = require("express");
const { getQuestion, isCorrectAnswer } = require("./utils/mathUtilities");
const app = express();
const port = 3000;

// maximum score for the quiz
// and this is the number of questions
const MAX_SCORE = 10;

// variable stores the current question number
// =0 for home page
// =1,2,3... for the quiz
// =MAX_SCORE+1 for the score page
let question_count = 0;

// variable stores the current question text
let question_text = "";

// current streak - the last number of correct answers in a row
// is reset to 0 if the answer is incorrect
// otherwise it is never reset, since we need it to display
// on the home page (but it's done only if al least one test was finished)
let current_streak = 0;

// we only need this in case user quits the quiz to go to the home page.
// and we onlt want to display streaks on home page from completed tests
// so in that case we need to know the last saved streak which was before
// the start of current test
let saved_streak = 0;

// past_answer_was_correct - whether the last answer was correct
// helps increasing the streak
let past_answer_was_correct = false;

// test_score - current score
// this is a sum of all corect answers in the test (out of MAX_SCORE)
let test_score = 0;

// test_record - array of objects, each object contains
let test_record = [];

// tests_taken - number of tests taken (between server restarts)
// we pretty much only need this to decide if we need to display the streak
// on the home page, it is done if it's >0
let tests_taken = 0;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static("public")); // To serve static files (e.g., CSS)

//Some routes required for full functionality are missing here. Only get routes should be required
app.get("/", (req, res) => {
  // if the test is in progress, redirect to the quiz page
  // do ot allow for manual navigation to the home page
  if (question_count > 0 && question_count <= MAX_SCORE) {
    return res.redirect("/quiz");
  }
  question_count = 0;
  question_text = "";
  past_answer_was_correct = false;
  current_streak = 0;
  test_score = 0;
  test_record = [];
  res.render("index", { saved_streak, MAX_SCORE, tests_taken });
});

app.get("/quiz", (req, res) => {
  // redirect to home if no test has started
  if (question_count === 0) {
    return res.redirect("/");
  }
  // redirect to score page if the test is over
  // we save the streak to display it on the score page
  // only when the test is over
  // and increment the number of tests taken as well
  if (question_count > MAX_SCORE) {
    tests_taken++;
    saved_streak = current_streak;
    return res.redirect("/score");
  }
  // if the question is not generated yet, generate it
  // but we need to generate only once, so on page reload
  // the question should stay the same
  if (!question_text) {
    question_text = getQuestion();
    console.log(`current question: ${question_text}`);
  }
  res.render("quiz", {
    current_streak,
    question_count,
    question_text,
    MAX_SCORE,
  });
});

//Handles quiz submissions.
app.post("/quiz", (req, res) => {
  const { answer } = req.body;
  console.log(`Answer: ${answer}`);
  //The `answer` variable will contain the value the user entered on the quiz page
  //You must add the logic here to check if the answer is correct, then track the streak and redirect the user
  //properly depending on whether or not they got the question right

  // check if the answer is correct
  const is_correct = isCorrectAnswer(question_text, answer);
  if (is_correct) {
    test_score++;
    // console.log("Correct Answer! Test score:", test_score);
    if (past_answer_was_correct) {
      current_streak++;
      // console.log("incrementing streak", current_streak);
    } else {
      // console.log("past answer was incorrect, now streak 1");
      current_streak = 1;
      past_answer_was_correct = true;
    }
  } else {
    // console.log("Incorrect Answer! Resetting streak to 0, score", test_score);
    current_streak = 0;
    past_answer_was_correct = false;
  }

  // adding the current question&answer to the test record
  // will display full table it on the score page
  test_record.push({
    question: question_text,
    answer: answer,
    correct: is_correct,
  });

  // next question, please
  question_count++;
  // reset the question text to generate a new question
  // otherwise the same question will be displayed
  question_text = "";
  // and we go back to the quiz page
  res.redirect("/quiz");
});

// score page, can be accessed only after the test is over
// otherwise it redirects to the home page
app.get("/score", (req, res) => {
  console.log("question count", question_count);
  if (question_count !== MAX_SCORE + 1) {
    return res.redirect("/");
  }
  res.render("score", { test_score, current_streak, MAX_SCORE, test_record });
});

// fake route to restart the quiz
app.get("/start", (req, res) => {
  question_count = 1;
  current_streak = 0;
  questions_answered = 0;
  current_question = "";
  res.redirect("/quiz");
});

// fake route to return to the home page
app.get("/home", (req, res) => {
  // need to reset the question count to 0
  // otherwise "/" will not let us in
  question_count = 0;
  console.log("Returning to home page. Tests taken:", tests_taken);
  res.redirect("/");
});

// any missing routes will redirect to the home page
app.use((req, res) => {
  // console.log("Unknown route accessed:", req.originalUrl);
  res.redirect("/");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
