import React from "react";
import { connect } from "react-redux";
import { setTextFilter, sortByAmount, sortByDate } from "../actions/filters";

const ExpenseListFilters = (props) => (
  <div>
    <input
      type="text"
      value={props.filters.text}
      onChange={(e) => {
        // same as store.dispatch(...)
        props.dispatch(setTextFilter(e.target.value));
        console.log(e.target.value);
      }}
    />
    <select
      /* controlled input means an input controlled from javascript (value is an example here) */
      value={props.filters.sortBy}
      onChange={(e) => {
        // doing this if since there is only 2 values to sort by
        e.target.value === "date"
          ? props.dispatch(sortByDate())
          : props.dispatch(sortByAmount());
      }}
    >
      <option value="date">Date</option>
      <option value="amount">Amount</option>
    </select>
  </div>
);

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

// connect helps redux use the state from react as props basically
export default connect(mapStateToProps)(ExpenseListFilters);
