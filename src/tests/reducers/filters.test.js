import filterReducer from "../../reducers/filters";
import moment from "moment";

test("should setup default filter values", () => {
  // @@INIT is used internally by Redux, we don't use it in production but can use it in testing
  const state = filterReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });
});

test("should set sortBy to amount", () => {
  const state = filterReducer(undefined, { type: "SORT_BY_AMOUNT" });
  expect(state.sortBy).toBe("amount");
});

test("should set sortBy to date", () => {
  // by default it's date so we have to write a few more lines
  const currentState = {
    text: "",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  };
  // const action = { type: "SORT_BY_DATE" };
  const state = filterReducer(undefined, /* action */ { type: "SORT_BY_DATE" });
  expect(state.sortBy).toBe("date");
});

test("should set text filter", () => {
  const state = filterReducer(undefined, {
    text: "asd",
    type: "SET_TEXT_FILTER"
  });
  expect(state.text).toBe("asd");
});

test("should set start date filter", () => {
  const state = filterReducer(undefined, {
    type: "SET_START_DATE",
    startDate: moment(0)
  });
  expect(state.startDate).toEqual(moment(0));
});

test("should set end date filter", () => {
  const state = filterReducer(undefined, {
    type: "SET_END_DATE",
    endDate: moment(0)
  });
  expect(state.endDate).toEqual(moment(0));
});
