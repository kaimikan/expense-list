import React from "react";
import { Link } from "react-router-dom";

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={"/edit/" + id}>
      <p>
        <b>Description:</b> {description}
      </p>
    </Link>
    <p>
      <b>Amount:</b> {amount}
    </p>
    <p>
      <b>Created At:</b> {createdAt}
    </p>
  </div>
);

// first part of connect()() is not always needed
// we use it now to get access to dispatch
export default ExpenseListItem;
