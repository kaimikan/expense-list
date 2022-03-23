import React from "react";
import { connect } from "react-redux";
import { removeExpense } from "../actions/expenses";

const ExpenseListItem = ({ dispatch, id, description, amount, createdAt }) => (
  <div>
    <p>Description: {description},</p>
    <p>Amount: {amount},</p>
    <p>Created At: {createdAt}</p>
    <button
      onClick={() => {
        dispatch(removeExpense({ expenseIDToRemove: id }));
      }}
    >
      Remove
    </button>
  </div>
);

// first part of connect()() is not always needed
// we use it now to get access to dispatch
export default connect()(ExpenseListItem);
