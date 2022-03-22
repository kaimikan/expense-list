import { createStore, combineReducers } from "redux";
import uuid from "uuid";

// ADD_EXPENSE
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE_EXPENSE
const removeExpense = ({ expenseIDToRemove } = {}) => ({
  type: "REMOVE_EXPENSE",
  expenseIDToRemove
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE"
});
// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});

// SET_START_DATE
const setStartDate = (startDate = undefined) => ({
  type: "SET_START_DATE",
  startDate
});

// SET_END_DATE
const setEndDate = (endDate = undefined) => ({
  type: "SET_END_DATE",
  endDate
});

// Expenses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      // WAY #1
      // // concat does not change the state variable, makes a copy instead and then changes it
      // return state.concat(action.expense);

      // WAY #2 ARRAY SPREAD OPERATOR ...
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(
        (expenseID) => action.expenseIDToRemove !== expenseID.id
      );
    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            // OBEJCT SPREAD OPERATOR ...
            // we take all of the indivial Expense's values and overwrite
            // only the ones which action.updates has
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

// Filters Reducer
const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date"
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount"
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};

// Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// // Expense
// const expenseOne = store.dispatch(
//   addExpense({ description: "Rent", amount: 20000 })
// );
// const expenseTwo = store.dispatch(
//   addExpense({ description: "Coffee", amount: 300 })
// );
// store.dispatch(removeExpense({ expenseIDToRemove: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// // Filter
// store.dispatch(setTextFilter("food"));
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// just treating them as numbers for now
store.dispatch(setStartDate(125));
store.dispatch(setStartDate());
store.dispatch(setEndDate(1250));
store.dispatch(setEndDate());

const demoState = {
  expenses: [
    {
      id: "asdassqwefgt",
      description: "April/May Rent",
      note: "This is the payment that has to be done at the end of March",
      amount: 37000 /* amount in cents */,
      createdAt: 0
    }
  ],
  filters: {
    text: "rent",
    sortBy: "amount", //date or amount
    startDate: undefined,
    endDate: undefined
  }
};

// OBJECT SPREAD OPERATOR
const user = {
  name: "Jen",
  age: 24
};
// needs babel-plugin-transform-object-rest-spread
console.log({ age: 26, ...user, location: "Philadelphia", age: 25 });
