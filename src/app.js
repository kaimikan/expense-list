import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";
import PortfolioRouter from "./playground/portfolio/routers/PortfolioRouter";
// if you don't specify path it auto looks in node_modules
import "normalize.css/normalize.css";
import "./styles/styles.scss";

ReactDOM.render(<PortfolioRouter />, document.getElementById("app"));
