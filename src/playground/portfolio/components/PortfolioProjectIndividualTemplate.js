import React from "react";

const PortfolioProjectIndivualPage = (props) => {
  console.log(props.match);
  return (
    <div>
      <h1>Project {props.match.params.id}</h1>
      <p>Project #{props.match.params.id} is...</p>
    </div>
  );
};
export default PortfolioProjectIndivualPage;
