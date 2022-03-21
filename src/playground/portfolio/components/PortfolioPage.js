import React from "react";
import { Link } from "react-router-dom";

const PortfolioPage = () => (
  <div>
    <p>Portfolio page</p>
    <Link to="/portfolio/1">Project One</Link>
    &nbsp;
    <Link to="/portfolio/2">Project Two</Link>
  </div>
);

export default PortfolioPage;
