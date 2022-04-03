import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
  // this gets called before every test case, helps us prevent copy paste code
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      expense={expenses[1]}
    />
  );
});

test("should render EditExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle start edit", () => {
  const changedExpense = expenses[1];
  changedExpense.description = "Grilled Chicken";
  wrapper.find("ExpenseForm").prop("onSubmit")(changedExpense);
  expect(history.push).toHaveBeenCalledWith("/");
  expect(startEditExpense).toHaveBeenLastCalledWith(
    changedExpense.id,
    changedExpense
  );
});

test("should handle start remove", () => {
  wrapper.find("button").simulate("click");
  expect(history.push).toHaveBeenCalledWith("/");
  expect(startRemoveExpense).toHaveBeenLastCalledWith({
    expenseIDToRemove: expenses[1].id
  });
});
