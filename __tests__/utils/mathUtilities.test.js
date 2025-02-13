const { isCorrectAnswer, getQuestion } = require("../../utils/mathUtilities");

describe("General tests for getQuestion function", () => {
  let question,
    question_parts,
    first_operand,
    operator,
    second_operand,
    num1,
    num2;

  // generate random question once before all tests
  beforeAll(() => {
    question = getQuestion();
    console.log("--> Generated Question:", question);

    // split the question into parts
    question_parts = question.split(" ");
    [first_operand, operator, second_operand] = question_parts;

    // parse operands as integers
    num1 = parseInt(first_operand, 10);
    num2 = parseInt(second_operand, 10);
  });

  it("should generate a question with exactly 3 parts", () => {
    expect(question_parts.length).toBe(3);
  });

  it("should have a valid operator", () => {
    expect(["+", "-", "×", "÷"]).toContain(operator);
  });

  it("should have a valid first operand", () => {
    expect(!isNaN(num1)).toBe(true);
  });

  it("should have a valid second operand", () => {
    expect(!isNaN(num2)).toBe(true);
  });
});

describe("Specific <ADDITION> tests for getQuestion function", () => {
  let question,
    question_parts,
    first_operand,
    operator,
    second_operand,
    num1,
    num2;

  // generate "+" question once before all tests
  beforeAll(() => {
    question = getQuestion("+");
    console.log("--> Generated Question:", question);

    // split the question into parts
    question_parts = question.split(" ");
    [first_operand, operator, second_operand] = question_parts;

    // parse operands as integers
    num1 = parseInt(first_operand, 10);
    num2 = parseInt(second_operand, 10);
  });

  it("should generate a question with exactly 3 parts", () => {
    expect(question_parts.length).toBe(3);
  });

  it("should have a valid addition operator", () => {
    expect(operator === "+").toBe(true);
  });

  it("should have a valid first operand", () => {
    expect(!isNaN(num1)).toBe(true);
  });

  it("should have a valid second operand", () => {
    expect(!isNaN(num2)).toBe(true);
  });

  it("should have 2-digit operands for addition", () => {
    expect(first_operand.length).toBe(2);
    expect(second_operand.length).toBe(2);
  });

  it("should have operands not ending in 0 for addition", () => {
    expect(first_operand.endsWith("0")).toBe(false);
    expect(second_operand.endsWith("0")).toBe(false);
  });
});

describe("Specific <SUBTRACTION> tests for getQuestion function", () => {
  let question,
    question_parts,
    first_operand,
    operator,
    second_operand,
    num1,
    num2;

  // generate "-" question once before all tests
  beforeAll(() => {
    question = getQuestion("-");
    console.log("--> Generated Question:", question);

    // split the question into parts
    question_parts = question.split(" ");
    [first_operand, operator, second_operand] = question_parts;

    // parse operands as integers
    num1 = parseInt(first_operand, 10);
    num2 = parseInt(second_operand, 10);
  });

  it("should generate a question with exactly 3 parts", () => {
    expect(question_parts.length).toBe(3);
  });

  it("should have a valid subtraction operator", () => {
    expect(operator === "-").toBe(true);
  });

  it("should have a valid first operand", () => {
    expect(!isNaN(num1)).toBe(true);
  });

  it("should have a valid second operand", () => {
    expect(!isNaN(num2)).toBe(true);
  });

  it("should have 2-digit operands for subtraction", () => {
    expect(first_operand.length).toBe(2);
    expect(second_operand.length).toBe(2);
  });

  it("should have operands not ending in 0 for subtraction", () => {
    expect(first_operand.endsWith("0")).toBe(false);
    expect(second_operand.endsWith("0")).toBe(false);
  });

  it("should have a 2-digit result for subtraction", () => {
    expect(num1 - num2 >= 10).toBe(true);
  });
});

describe("Specific <MULTIPLICATION> tests for getQuestion function", () => {
  let question,
    question_parts,
    first_operand,
    operator,
    second_operand,
    num1,
    num2;

  // generate "*" question once before all tests
  beforeAll(() => {
    question = getQuestion("×");
    console.log("--> Generated Question:", question);

    // split the question into parts
    question_parts = question.split(" ");
    [first_operand, operator, second_operand] = question_parts;

    // parse operands as integers
    num1 = parseInt(first_operand, 10);
    num2 = parseInt(second_operand, 10);
  });

  it("should generate a question with exactly 3 parts", () => {
    expect(question_parts.length).toBe(3);
  });

  it("should have a valid multiplication operator", () => {
    expect(operator === "×").toBe(true);
  });

  it("should have a valid first operand", () => {
    expect(!isNaN(num1)).toBe(true);
  });

  it("should have a valid second operand", () => {
    expect(!isNaN(num2)).toBe(true);
  });

  it("should have multipliers within (3-9) and (3-17)", () => {
    expect(
      (num1 >= 3 && num1 <= 9 && num2 >= 3 && num2 <= 17) ||
        (num2 >= 3 && num2 <= 9 && num1 >= 3 && num1 <= 17)
    ).toBe(true);
  });
});

describe("Specific <DIVISION> tests for getQuestion function", () => {
  let question,
    question_parts,
    first_operand,
    operator,
    second_operand,
    num1,
    num2;

  // generate "*" question once before all tests
  beforeAll(() => {
    question = getQuestion("÷");
    console.log("--> Generated Question:", question);

    // split the question into parts
    question_parts = question.split(" ");
    [first_operand, operator, second_operand] = question_parts;

    // parse operands as integers
    num1 = parseInt(first_operand, 10);
    num2 = parseInt(second_operand, 10);
  });

  it("should generate a question with exactly 3 parts", () => {
    expect(question_parts.length).toBe(3);
  });

  it("should have a valid division operator", () => {
    expect(operator === "÷").toBe(true);
  });

  it("should have a valid first operand", () => {
    expect(!isNaN(num1)).toBe(true);
  });

  it("should have a valid second operand", () => {
    expect(!isNaN(num2)).toBe(true);
  });

  it("should have a divident less than 99", () => {
    expect(num1 <= 99).toBe(true);
  });

  it("should have a divisor between 2 and 9", () => {
    expect(num2 >= 2 && num2 <= 9).toBe(true);
  });

  it("should have an integer quotient", () => {
    expect(num1 % num2 === 0).toBe(true);
  });
});

// now check the isCorrectAnswer function
describe("Tests for isCorrectAnswer", () => {
  it("true in case of a correct addition answer", () => {
    const question = "45 + 23";
    const answer = "68";
    expect(isCorrectAnswer(question, answer)).toBe(true);
  });

  it("true in case of a correct subtraction answer", () => {
    const question = "45 - 23";
    const answer = "22";
    expect(isCorrectAnswer(question, answer)).toBe(true);
  });

  it("true in case of a correct multiplication answer", () => {
    const question = "5 × 11";
    const answer = "55";
    expect(isCorrectAnswer(question, answer)).toBe(true);
  });

  it("true in case of a correct division answer", () => {
    const question = "88 ÷ 11";
    const answer = "8";
    expect(isCorrectAnswer(question, answer)).toBe(true);
  });

  it("should give false for an incorrect answer", () => {
    const question = "23 - 12";
    const answer = "4";
    expect(isCorrectAnswer(question, answer)).toBe(false);
  });

  it("should give false in case of incorrect question", () => {
    const question = "45 plus 23";
    const answer = "67";
    expect(isCorrectAnswer(question, answer)).toBe(false);
  });

  it("should give false in case of non-integer answer", () => {
    const question = "45 plus 23";
    const answer = "2.5";
    expect(isCorrectAnswer(question, answer)).toBe(false);
  });
});
