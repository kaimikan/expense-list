import React from "react";
import ReactShallowRenderer from "react-test-renderer/shallow";
import Header from "../../components/Header";

test("should render Header correctly", () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<Header />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
  //console.log(renderer.getRenderOutput());
  //snapshot testing can be updated if a change is made and we want to keep it
});
