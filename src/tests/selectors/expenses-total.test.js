import sumExpenseAmount from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

test("should return 0 if no expenses", () => {
  const expensesEdit = [];
  const result = sumExpenseAmount(expensesEdit);
  expect(result).toEqual(0);
});

test("should correctly add up a single expense", () => {
  const expensesEdit = [expenses[0]];
  const result = sumExpenseAmount(expensesEdit);
  const properSum = expenses[0].amount;
  expect(result).toEqual(properSum);
});

test("should correctly add up multiple expenses", () => {
  const result = sumExpenseAmount(expenses);
  const properSum =
    expenses[0].amount + expenses[1].amount + expenses[2].amount;
  expect(result).toEqual(properSum);
});
