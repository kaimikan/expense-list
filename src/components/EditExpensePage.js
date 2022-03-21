import React from "react";

const EditExpensePage = (props) => {
  console.log("props");
  return <div>This is from the edit component {props.match.id}</div>;
};
export default EditExpensePage;
