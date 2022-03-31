import React from "react";
import { shallow } from "enzyme";
import { ExpenseSummary } from "../../components/ExpenseSummary";
import expenses from "../fixtures/expenses";

test("should render ExpenseSummary with multiple expenses", () => {
  const wrapper = shallow(<ExpenseSummary numberOfExpenses={2} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseSummary with 1 expense", () => {
  const wrapper = shallow(<ExpenseSummary numberOfExpenses={1} />);
  expect(wrapper).toMatchSnapshot();
});
