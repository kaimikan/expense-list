import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import getVisibleExpenses from "./selectors/expenses";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";
import "./firebase/firebase";
import "./playground/promises";

const store = configureStore();

store.dispatch(
  addExpense({
    description: "Water Bill",
    amount: 2000,
    createdAt: 50000,
    note: "water bill"
  })
);

store.dispatch(
  addExpense({
    description: "Gas Bill",
    amount: 9999999,
    createdAt: 25000,
    note: "gas bill"
  })
);

store.dispatch(
  addExpense({
    description: "Rent",
    amount: 50000,
    createdAt: 10000,
    note: "rent bill"
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
