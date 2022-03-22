import { createStore } from "redux";

const store = createStore(
  (state = { count: 0 }, action /* used for .dispatch */) => {
    switch (action.type) {
      case "INCREMENT_COUNT":
        const incrementBy =
          typeof action.incrementBy === "number" ? action.incrementBy : 1;
        return {
          count: state.count + incrementBy
        };
      case "DECREMENT_COUNT":
        const decrementBy =
          typeof action.decrementBy === "number" ? action.decrementBy : 1;
        return {
          count: state.count - decrementBy
        };
      case "SET_COUNT":
        return {
          count: action.count
        };
      case "RESET_COUNT":
        return {
          count: 0
        };
      default:
        return state;
    }
  }
);

// kind of like render(), whatever is inside gets called whenever the state changes
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
// if we want to unsubscribe we set it to a const and then
// unsubscribe();

// Action - an object that gets sent to the store
// (in/de)crement/reset count
// convention to have ALL_CAPS
store.dispatch({
  type: "INCREMENT_COUNT",
  incrementBy: 5
});
store.dispatch({
  type: "INCREMENT_COUNT"
});
store.dispatch({
  type: "RESET_COUNT"
});
store.dispatch({
  type: "DECREMENT_COUNT",
  decrementBy: 10
});
store.dispatch({
  type: "DECREMENT_COUNT"
});
store.dispatch({
  type: "SET_COUNT",
  count: 101
});
