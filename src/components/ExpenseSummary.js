import React from "react";
import { connect } from "react-redux";
import selectExpenses from "../selectors/expenses";
import sumExpensesAmounts from "../selectors/expenses-total";
import numeral from "numeral";
import { Link } from "react-router-dom";

export const ExpenseSummary = (props) => {
  const expenseText = props.numberOfExpenses === 1 ? "expense" : "expenses";
  const expenseTotalNumeral = numeral(props.expensesTotalAmount / 100).format(
    "0,0[.]00"
  );
  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">
            Viewing <span>{props.numberOfExpenses}</span> {expenseText}{" "}
            totalling <span>€{expenseTotalNumeral}</span>
          </h1>
          <div className="page-header__actions">
            <Link className="button" to="/add">
              Add Expense
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Short Version
const mapStateToProps = (state) => {
  return {
    numberOfExpenses: selectExpenses(state.expenses, state.filters).length,
    expensesTotalAmount: sumExpensesAmounts(state.expenses)
  };
};

export default connect(mapStateToProps)(ExpenseSummary);
