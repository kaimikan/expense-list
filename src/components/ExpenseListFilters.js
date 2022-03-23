import React from "react";
import { connect } from "react-redux";
import { setTextFilter } from "../actions/filters";

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
  </div>
);

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

// connect helps redux use the state from react as props basically
export default connect(mapStateToProps)(ExpenseListFilters);
