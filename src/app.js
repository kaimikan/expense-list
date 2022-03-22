import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import getVisibleExpenses from "./selectors/expenses";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();

store.dispatch(
  addExpense({ description: "Water Bill", amount: 2000, createdAt: 50000 })
);

store.dispatch(
  addExpense({ description: "Gas Bill", amount: 9999999, createdAt: 9000000 })
);

store.dispatch(setTextFilter("bill"));
store.dispatch(setTextFilter("water"));

console.log(store.getState());

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filter);
  console.log(visibleExpenses);
});

ReactDOM.render(<AppRouter />, document.getElementById("app"));
