import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

const ExpenseList = (props) => (
  <div>
    <h1>Expense List</h1>
    {props.expenses.map((expense) => {
      return (
        <div>
          <b>Expense Item</b>
          <ExpenseListItem key={expense.id} {...expense} />
        </div>
      );
    })}
  </div>
);

/* Long Version
const ConnectedExpenseList = connect((state) => {
  return {
    expenses: state.expenses
  };
})(ExpenseList);

export default ConnectedExpenseList;
*/

// Short Version
const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList);
