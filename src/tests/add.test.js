//important to have .test.js since Jest is looking for test files based on it
const add = (a, b) => a + b;
const generateGreeting = (name = "Anon") => `Hello, ${name}!`;

test("should add two numbers", () => {
  const result = add(3, 4);

  /* if (result !== 7) {
    throw new Error(`You added 4 and 3. The result was ${result}. Expected 7.`);
  } */
  expect(result).toBe(7);
});

test("should return proper greeting", () => {
  const greeting = generateGreeting("Joe");
  expect(greeting).toBe("Hello, Joe!");
});

test("should return proper greeting for no name", () => {
  const greeting = generateGreeting();
  expect(greeting).toBe("Hello, Anon!");
});
