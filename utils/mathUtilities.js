let last_operator = null;
const operations = ["+", "-", "×", "÷"];
/**
 * Gets a randomly generated multiplication, division, subtraction or addition question
 *
 * @returns {} The randomly generated math question
 */

// I did paramater here to test the function with different operators in Jest
function getQuestion(operator = null) {
  let first_operand = 0;
  let second_operand = 0;

  // console.log("last operator was: <", last_operator, ">");
  // first we generate random operator, ensure
  // it's different from the last one
  if (!operator || !operations.includes(operator)) {
    do {
      operator = operations[Math.floor(Math.random() * operations.length)];
    } while (operator === last_operator);
  }
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
      // 2 digit numbers (1st one from 31 to 99, 2nd one from 11),
      // and not ending in 0, and result must be 2 digit as well,
      // but not negative
      do {
        first_operand = Math.floor(Math.random() * 69) + 31;
      } while (first_operand % 10 === 0);
      // random number between least 11 and (first_operand-11),
      // result must be a two-digit number,
      // and difference should not be ending in 0
      do {
        second_operand = Math.floor(Math.random() * (first_operand - 10)) + 11;
      } while (
        // second_operand shouldn't end in 0
        second_operand % 10 === 0 ||
        // result shouldn't end in 0
        (first_operand - second_operand) % 10 === 0 ||
        // result must be a two-digit number
        first_operand - second_operand < 10
      );
      break;
    case "×":
      // 1st operand be between 3 and 9, second - between 3 an 17.
      // or visa versa
      if (Math.random() < 0.5) {
        first_operand = Math.floor(Math.random() * 7) + 3;
        do {
          second_operand = Math.floor(Math.random() * 15) + 3;
        } while (second_operand % 10 === 0);
      } else {
        do {
          first_operand = Math.floor(Math.random() * 15) + 3;
        } while (first_operand % 10 === 0);
        second_operand = Math.floor(Math.random() * 7) + 3;
      }
      break;
    case "÷":
      // generate a random divisor between 2 and 9
      second_operand = Math.floor(Math.random() * 8) + 2;

      // get maximum quotient such that first_operand(dividend) <= 99
      const n = Math.floor(99 / second_operand);

      // ensure that the quotient is not 10
      if (n === 10) {
        // if n=10, choose quotient from 2 to 9
        quotient = Math.floor(Math.random() * 8) + 2;
      } else {
        // random quotient between 2 and n (but excluding 10)
        do {
          quotient = Math.floor(Math.random() * (n - 1)) + 2;
        } while (quotient === 10);
      }

      // get dividend
      first_operand = quotient * second_operand;
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

// just a note - I only deal with integers here, no floats
// and question string only includes integers and operators
// so I may only need to check floats in the answer
// if accidentally provided by the user during the test
function isCorrectAnswer(question, answer) {
  // split the question into 2 operands and an operator
  // trim just in case
  const [first_operand, operator, second_operand] = question
    .split(" ")
    .map((question_part) => question_part.trim());

  // convert the operands to integers, answer as well
  const num1 = parseInt(first_operand, 10);
  const num2 = parseInt(second_operand, 10);

  // check for valid integers, just in case
  if (isNaN(num1) || isNaN(num2)) {
    return false;
  }

  // const answer_integer = parseInt(answer.trim(), 10);
  // need to deal with possible float answers
  const answer_integer = parseFloat(answer.trim());
  if (isNaN(answer_integer) || !Number.isInteger(answer_integer)) {
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
    case "×":
      correct_answer = num1 * num2;
      break;
    case "÷":
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
