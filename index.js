const express = require("express");
const app = express();
const port = 3000;

// maximum score for the quiz
// and this is the number of questions
const MAX_SCORE = 10;

// streak counter and last score recorded
let past_streaks = 0;
let last_score = 0;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static("public")); // To serve static files (e.g., CSS)

//Some routes required for full functionality are missing here. Only get routes should be required
app.get("/", (req, res) => {
  res.render("index", { past_streaks, MAX_SCORE, last_score });
});

app.get("/quiz", (req, res) => {
  res.render("quiz");
});

//Handles quiz submissions.
app.post("/quiz", (req, res) => {
  const { answer } = req.body;
  console.log(`Answer: ${answer}`);

  //The `answer` variable will contain the value the user entered on the quiz page
  //You must add the logic here to check if the answer is correct, then track the streak and redirect the user
  //properly depending on whether or not they got the question right

  //By default we'll just redirect to the homepage again.
  res.redirect("/");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
