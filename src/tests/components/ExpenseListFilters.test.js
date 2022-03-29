import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";
import moment from "moment";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test("should render ExpenseListFilters correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilters with alt data correctly", () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test("should setTextFilter correctly", () => {
  wrapper.find("input").simulate("change", { target: { value: "asdas" } });
  expect(setTextFilter).toHaveBeenLastCalledWith("asdas");
});

test("should sortByDate correctly", () => {
  // we do it since it's date by default
  wrapper.setProps({
    filters: altFilters
  });
  wrapper
    .find("select")
    .at(0)
    .simulate("change", {
      target: { value: "date", name: "Date" }
    });
  expect(sortByDate).toHaveBeenCalled();
});

test("should sortByAmount correctly", () => {
  wrapper
    .find("select")
    .at(0)
    .simulate("change", {
      target: { value: "amount", name: "Amount" }
    });
  expect(sortByAmount).toHaveBeenCalled();
});

test("should set(Start/End)Date correctly", () => {
  const startDateChange = moment(0);
  const endDateChange = moment(0).add(5, "years");
  wrapper.find("DateRangePicker").prop("onDatesChange")({
    startDate: startDateChange,
    endDate: endDateChange
  });
  expect(setStartDate).toHaveBeenLastCalledWith(startDateChange);
  expect(setEndDate).toHaveBeenLastCalledWith(endDateChange);
});

test("should handle date focus correctly", () => {
  const calendarFocus = "endDate";
  wrapper.find("DateRangePicker").prop("onFocusChange")(calendarFocus);
  expect(wrapper.state("calendarFocused")).toBe(calendarFocus);
});
