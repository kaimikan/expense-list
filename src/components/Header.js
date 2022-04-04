import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";

export const Header = ({ startLogout }) => (
  <header>
    <h1>Expense List</h1>
    <NavLink to="/dashboard" activeClassName="is-active">
      Dashboard
    </NavLink>
    &nbsp;
    <NavLink to="/add" activeClassName="is-active">
      Add
    </NavLink>
    {/* &nbsp;
    <NavLink to="/help" activeClassName="is-active">
      Help
    </NavLink> */}
    <button onClick={startLogout}>Log Out</button>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
