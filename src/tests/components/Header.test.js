import React from "react";
import { shallow } from "enzyme";
import Header from "../../components/Header";

test("should render Header correctly", () => {
  const wrapper = shallow(<Header />);
  //expect(wrapper.find("h1").text()).toBe("Expense List");
  expect(wrapper).toMatchSnapshot();

  /*
  REACT TEST RENDERER  
  const renderer = new ReactShallowRenderer();
  renderer.render(<Header />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
  //console.log(renderer.getRenderOutput());
  //snapshot testing can be updated if a change is made and we want to keep it
 */
});
