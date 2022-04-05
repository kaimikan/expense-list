import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

export const ExpenseList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>

    <div className="list-body">
      {/* <h1>Expense List</h1> */}
      {props.expenses.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No expenses to show</span>
        </div>
      ) : (
        props.expenses.map((expense) => {
          return (
            <div key={expense.id}>
              <ExpenseListItem {...expense} />
            </div>
          );
        })
      )}
    </div>
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
