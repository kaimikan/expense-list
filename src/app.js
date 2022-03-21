import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";
// if you don't specify path it auto looks in node_modules
import "normalize.css/normalize.css";
import "./styles/styles.scss";

ReactDOM.render(<AppRouter />, document.getElementById("app"));
