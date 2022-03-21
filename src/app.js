import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
// if you don't specify path it auto looks in node_modules
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const ExpenseDashboardPage = () => (
  <div>This is from the dashboard component</div>
);

const AddExpensePage = () => <div>This is from the add component</div>;

const EditExpensePage = () => <div>This is from the edit component</div>;

const HelpPage = () => <div>This is from the Help component</div>;

const NotFoundPage = () => (
  <div>
    404! - <Link to="/">Go Home</Link>
  </div>
);

const Header = () => (
  <header>
    <h1>Expense List</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>
      Home
    </NavLink>
    &nbsp;
    <NavLink to="/add" activeClassName="is-active">
      Add
    </NavLink>
    &nbsp;
    <NavLink to="/edit" activeClassName="is-active">
      Edit
    </NavLink>
    &nbsp;
    <NavLink to="/help" activeClassName="is-active">
      Help
    </NavLink>
  </header>
);

const routes = (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={ExpenseDashboardPage} exact={true} />
        <Route path="/add" component={AddExpensePage} />
        <Route path="/edit" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById("app"));
