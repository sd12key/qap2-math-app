let last_operator = null;
const operations = ["+", "-", "*", "/"];
/**
 * Gets a randomly generated multiplication, division, subtraction or addition question
 *
 * @returns {} The randomly generated math question
 */
function getQuestion() {
  let first_operand = 0;
  let second_operand = 0;
  let operator = "";

  // first we generate random operator, ensure
  // it's different from the last one
  do {
    operator = operations[Math.floor(Math.random() * operations.length)];
  } while (operator === last_operator);
  last_operator = operator;

  // now generate random operands
  switch (operator) {
    case "+":
      // to make things interesting, add only 2 digit numbers
      // between 11 and 99, and not ending in 0
      do {
        first_operand = Math.floor(Math.random() * 89) + 11;
      } while (first_operand % 10 === 0);
      do {
        second_operand = Math.floor(Math.random() * 89) + 11;
      } while (second_operand % 10 === 0);
      break;
    case "-":
      // to make things interesting, subtract only
      // 2 digit numbers from 11 to 99, and not ending in 0
      // and result must be 2 digit as well, but not negative
      do {
        first_operand = Math.floor(Math.random() * 89) + 11;
      } while (first_operand % 10 === 0);
      // random number between 11 and (first_operand - 11)
      // difference should not be ending in 0
      do {
        second_operand = Math.floor(Math.random() * (first_operand - 21)) + 11;
      } while (
        second_operand % 10 === 0 ||
        (first_operand - second_operand) % 10 === 0
      );
      break;
    case "*":
      // to make things interesting, one of the operands can be between 3 and 9, second - between 3 an 17.

      // 50% chance of first operand being between 3 and 9
      if (Math.random() < 0.5) {
        first_operand = Math.floor(Math.random() * 7) + 3;
        second_operand = Math.floor(Math.random() * 15) + 3;
      }
      // 50% chance of first operand being between 3 and 9
      else {
        second_operand = Math.floor(Math.random() * 7) + 3;
        first_operand = Math.floor(Math.random() * 15) + 3;
      }
      break;
    case "/":
      do {
        // random number between 3 and 49, and not 10
        second_operand = Math.floor(Math.random() * 47) + 3;
      } while (second_operand === 10);

      // find appropriate integer multiplier so the
      // divisible is between 12 and 99
      do {
        const multiplier =
          Math.floor(Math.random() * Math.floor(99 / second_operand)) + 1;
        first_operand = second_operand * multiplier;
      } while (first_operand < 12 || first_operand > 99);
      break;
  }
  return `${first_operand} ${operator} ${second_operand}`;
}

/**
 * Parses the provided question and gets whether or not the provided answer is correct
 *
 * @param {*} question The question being answered
 * @param {*} answer The potential answer
 * @returns {boolean} True if the answer was correct, false otherwise.
 */
function isCorrectAnswer(question, answer) {
  // split the question into 2 operands and an operator
  // trim just in case
  const [first_operand, operator, second_operand] = question
    .split(" ")
    .map((question_part) => question_part.trim());

  // convert the operands to integers, answer as well
  const num1 = parseInt(first_operand, 10);
  const num2 = parseInt(second_operand, 10);
  const answer_integer = parseInt(answer.trim(), 10);

  // check for valid integers
  if (isNaN(num1) || isNaN(num2) || isNaN(answer_integer)) {
    return false;
  }

  // calculate the correct answer based on the operator
  let correct_answer;
  switch (operator) {
    case "+":
      correct_answer = num1 + num2;
      break;
    case "-":
      correct_answer = num1 - num2;
      break;
    case "*":
      correct_answer = num1 * num2;
      break;
    case "/":
      // division by 0 is not allowed
      if (num2 === 0) return false;
      correct_answer = num1 / num2;
      // check if the result is an integer
      if (correct_answer % 1 !== 0) return false;
      break;
    default:
      return false;
  }

  // check if the answer is correct
  return correct_answer === answer_integer;
}

module.exports = {
  getQuestion,
  isCorrectAnswer,
};
