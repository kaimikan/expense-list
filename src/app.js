import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
    404! <a href="/">Go Home</a>
  </div>
);

const routes = (
  <BrowserRouter>
    <div>
      <div>
        <a href="/">Home</a>
        &nbsp;
        <a href="/add">Add</a>
        &nbsp;
        <a href="/edit">Edit</a>
        &nbsp;
        <a href="/help">Help</a>
      </div>

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
