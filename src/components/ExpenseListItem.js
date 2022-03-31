import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={"/edit/" + id}>
      <p>
        <b>Description:</b> {description}
      </p>
    </Link>
    <p>
      <b>Amount:</b> €{numeral(amount / 100).format("0,0[.]00")}
    </p>
    <p>
      <b>Created At:</b> {moment(createdAt).format("Do MMMM YYYY")}
    </p>
  </div>
);

// first part of connect()() is not always needed
// we use it now to get access to dispatch
export default ExpenseListItem;
