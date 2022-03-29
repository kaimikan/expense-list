import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
  // this gets called before every test case, helps us prevent copy paste code
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      editExpense={editExpense}
      removeExpense={removeExpense}
      history={history}
      expense={expenses[1]}
    />
  );
});

test("should render EditExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle edit", () => {
  const changedExpense = expenses[1];
  changedExpense.description = "Grilled Chicken";
  wrapper.find("ExpenseForm").prop("onSubmit")(changedExpense);
  expect(history.push).toHaveBeenCalledWith("/");
  expect(editExpense).toHaveBeenLastCalledWith(
    changedExpense.id,
    changedExpense
  );
});

test("should handle remove", () => {
  wrapper.find("button").simulate("click");
  expect(history.push).toHaveBeenCalledWith("/");
  expect(removeExpense).toHaveBeenLastCalledWith({
    expenseIDToRemove: expenses[1].id
  });
});
