import expenseReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
  const state = expenseReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    expenseIDToRemove: expenses[1].id
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expense if id is not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    expenseIDToRemove: "-123"
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[1], expenses[2]]);
});

test("should add an expense", () => {
  const expenseToAdd = {
    id: "4",
    description: "Yoghurt",
    note: "",
    amount: 299000,
    createdAt: 0
  };
  const action = {
    type: "ADD_EXPENSE",
    expense: expenseToAdd
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual(
    [
      ...expenses,
      expenseToAdd
    ] /* [expenses[0], expenses[1], expenses[2], expenseToAdd] */
  );
});

test("should edit an expense", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: expenses[0].id,
    updates: { description: "Salami Pizza" }
  };
  const state = expenseReducer(expenses, action);
  expect(state[0].description).toEqual("Salami Pizza");
});

test("should not edit an expense if id is not found", () => {
  const expenseToEdit = expenses[0];
  const action = {
    type: "EDIT_EXPENSE",
    id: "-2",
    updates: { description: "Pepperoni Pizza" }
  };
  const state = expenseReducer(expenses, action);
  expect(state[0].description).not.toEqual("Pepperoni Pizza");
});

test("should set expenses", () => {
  const action = {
    type: "SET_EXPENSES",
    expenses: [expenses[1]]
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});
