import uuid from "uuid";
import db from "../firebase/firebase";
import {
  getDatabase,
  ref,
  get,
  child,
  set,
  update,
  remove,
  onValue,
  off,
  push,
  onChildAdded,
  onChildChanged,
  onChildRemoved
} from "firebase/database";

// PRE ASYNCHRONOUS
/* 
-component calls action generator
-action generator returns object
-component distaptches object
-redux store changes
*/

//POST ASYNCHRONOUS
/* 
-components calls action generator
-action generator returns function
-component dispatches function (?)
-function runs (has the ability to dispatch other actions and do whatever it wants)
*/

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: "ADD_EXPENSE",
  expense
});

export const startAddExpense = (expenseData = {}) => {
  // this syntax works because of redux thunk
  return (dispatch) => {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt };
    return push(ref(db, "expenses"), expense).then((ref) => {
      dispatch(
        addExpense({
          id: ref.key,
          ...expense
        })
      );
    });
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ expenseIDToRemove } = {}) => ({
  type: "REMOVE_EXPENSE",
  expenseIDToRemove
});

export const startRemoveExpense = ({ expenseIDToRemove } = {}) => {
  return (dispatch) => {
    return remove(ref(db, `expenses/${expenseIDToRemove}`)).then(() => {
      dispatch(removeExpense({ expenseIDToRemove }));
    });
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

export const startEditExpense = (id, updates) => {
  const updatesHolder = {};
  updatesHolder[`expenses/${id}`] = { ...updates };
  return (dispatch) => {
    return update(ref(db), updatesHolder).then(() => {
      dispatch(editExpense(id, updates));
    });
  };
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: "SET_EXPENSES",
  expenses
});

//export const startSetExpenses;
export const startSetExpenses = () => {
  // this syntax works because of redux thunk
  return (dispatch) => {
    return get(child(ref(db), `expenses`)).then((dataSnapshot) => {
      const expensesData = [];
      dataSnapshot.forEach((childSnapshot) => {
        const id = childSnapshot.key;
        expensesData.push({
          id,
          ...childSnapshot.val()
        });
      });

      return dispatch(setExpenses(expensesData));
    });
  };
};
