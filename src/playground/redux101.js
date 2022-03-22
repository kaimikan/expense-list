import { createStore } from "redux";

// Action generators - functions that return action objects
// helps avoid typos in multiple calls, reduces bulk, and throws more useful errors if something is up

// // destructuring
// const add = ({ a, b }, c /* data, number */) => {
//   return a + b + c /* data.a + data.b + number */;
// };

// console.log(add({ a: 1, b: 2 }, 4));

// // before destructuring
// const incrementCount = (payload = {}) => ({
//   type: "INCREMENT_COUNT",
//   incrementBy: typeof payload.incrementBy === "number" ? payload.incrementBy : 1
// });

// after destructuring (DAMN, pretty cool)
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT_COUNT",
  incrementBy //this is the error: error => error simplification
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: "DECREMENT_COUNT",
  decrementBy
});

const resetCount = () => ({
  type: "RESET_COUNT"
});

const setCount = ({ count } = {}) => ({
  type: "SET_COUNT",
  count
});

const store = createStore(
  (state = { count: 0 }, action /* used for .dispatch */) => {
    switch (action.type) {
      case "INCREMENT_COUNT":
        return {
          count: state.count + action.incrementBy
        };
      case "DECREMENT_COUNT":
        return {
          count: state.count - action.decrementBy
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
// store.dispatch({
//   type: "INCREMENT_COUNT",
//   incrementBy: 5
// });
store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());
store.dispatch(resetCount());
store.dispatch(decrementCount({ decrementBy: 10 }));
store.dispatch(decrementCount());
store.dispatch(setCount({ count: 101 }));
