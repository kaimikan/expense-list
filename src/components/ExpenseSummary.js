import React from "react";
import { connect } from "react-redux";
import selectExpenses from "../selectors/expenses";
import sumExpensesAmounts from "../selectors/expenses-total";
import numeral from "numeral";

export const ExpenseSummary = (props) => (
  <div>
    {/* would be smarter if the ternary operator was concluded in variables instead of having
     multiple paragraphs being reused along with the function calls
     - will keep it to commemorate an nonoptimal solution
     e.g. const expenseText = props.numberOfExpenses === 1 ? 'expense' : 'expenses';
     */}
    {props.numberOfExpenses === 0 ? (
      <p></p>
    ) : props.numberOfExpenses === 1 ? (
      <p>
        Viewing 1 expense totalling €
        {numeral(props.expensesTotalAmount / 100).format("0,0[.]00")}
      </p>
    ) : (
      <p>
        Viewing {props.numberOfExpenses} expenses totalling €
        {numeral(props.expensesTotalAmount / 100).format("0,0[.]00")}
      </p>
    )}
  </div>
);

// Short Version
const mapStateToProps = (state) => {
  return {
    numberOfExpenses: selectExpenses(state.expenses, state.filters).length,
    expensesTotalAmount: sumExpensesAmounts(state.expenses)
  };
};

export default connect(mapStateToProps)(ExpenseSummary);
