import selectExpenses from "../../selectors/expenses";
import moment from "moment";

const expenses = [
  {
    id: "1",
    description: "Pizza",
    note: "",
    amount: 399000,
    createdAt: moment(0).add(4, "days").valueOf()
  },
  {
    id: "2",
    description: "Chicken",
    note: "",
    amount: 599,
    createdAt: moment(0).subtract(4, "days").valueOf()
  },
  {
    id: "3",
    description: "Oats",
    note: "",
    amount: 150,
    createdAt: 0
  }
];

test("should filter by text value", () => {
  const filters = {
    text: "a",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[0], expenses[2]]);
});

test("should filter by start date", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: moment(0),
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[0], expenses[2]]);
});

test("should filter by end date", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: moment(0)
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[1]]);
});

test("should filter by date", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[0], expenses[2], expenses[1]]);
});

test("should filter by amount", () => {
  const filters = {
    text: "",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[0], expenses[1], expenses[2]]);
});
