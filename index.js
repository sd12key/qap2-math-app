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

// past_answer_was_correct - whether the last answer was correct
// helps increasing the streak
let past_answer_was_correct = false;

// test_score - current score
// this is a sum of all corect answers in the test (out of MAX_SCORE)
let test_score = 0;

// tests_taken - number of tests taken (between server restarts)
// we pretty much only need this to decide if we need to display the streak
// on the home page, it is done if it's >0
let tests_taken = 0;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static("public")); // To serve static files (e.g., CSS)

//Some routes required for full functionality are missing here. Only get routes should be required
app.get("/", (req, res) => {
  question_text = "";
  question_count = 1;
  past_answer_was_correct = false;
  current_streak = 0;
  test_score = 0;
  console.log(
    "MAIN PAGE, Tests taken",
    tests_taken,
    ", last_streak",
    current_streak
  );

  res.render("index", { current_streak, MAX_SCORE, tests_taken });
});

app.get("/quiz", (req, res) => {
  if (question_count > MAX_SCORE) {
    tests_taken++;
    return res.redirect("/score");
  }
  //   question_count = questions_answered + 1;
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
  //By default we'll just redirect to the homepage again.
  //   res.redirect("/");
  if (isCorrectAnswer(question_text, answer)) {
    test_score++;
    console.log("Correct Answer! Test score:", test_score);
    if (past_answer_was_correct) {
      current_streak++;
      console.log("incrementing streak", current_streak);
    } else {
      console.log("past answer was incorrect, now streak 1");
      current_streak = 1;
      past_answer_was_correct = true;
    }
  } else {
    console.log("Incorrect Answer! Resetting streak to 0, score", test_score);
    current_streak = 0;
    past_answer_was_correct = false;
  }
  question_count++;
  question_text = "";
  res.redirect("/quiz");
});

app.get("/score", (req, res) => {
  console.log("question count", question_count);
  if (question_count <= MAX_SCORE) {
    return res.redirect("/");
  }
  const score_streak = current_streak;
  const score_test = test_score;
  question_count = 1;
  res.render("score", { score_test, score_streak, MAX_SCORE });
});

// fake route to restart the quiz
app.get("/start", (req, res) => {
  question_count = 1;
  quiz_in_progress = true;
  current_score = 0;
  questions_answered = 0;
  current_question = "";
  res.redirect("/quiz");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
