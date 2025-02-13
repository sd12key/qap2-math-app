const express = require("express");
const { getQuestion, isCorrectAnswer } = require("./utils/mathUtilities");
const app = express();
const port = 3000;

// maximum score for the quiz
// and this is the number of questions
const MAX_SCORE = 10;
// variable stores the current question number
let question_count = 1;
// variable stores the current question text
let question_text = "";
// current streak - number of correct answers in a row
let current_streak = 0;
// past_answer_was_correct - whether the last answer was correct
let past_answer_was_correct = false;
// test_score - current score
let test_score = 0;
// tests_taken - number of tests taken
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
    return res.redirect("/");
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

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
