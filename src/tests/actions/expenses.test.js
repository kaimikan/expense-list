import { ref, child, get, set } from "firebase/database";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import db from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);
const mockUID = "mockuid";
const defaultAuthState = { auth: { uid: mockUID } };

// setting up dummy data
beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  set(ref(db, `users/${mockUID}/expenses`), expensesData).then(() => done());
});

test("should setup remove expense action object", () => {
  const action = removeExpense({ expenseIDToRemove: "123abc" });
  // toBe does not work properly because it compares with === which will never work for two separate objects even if they have the same info
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    expenseIDToRemove: "123abc"
  });
});

test("should remove expense from firebase", (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[1].id;
  store
    .dispatch(startRemoveExpense({ expenseIDToRemove: id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_EXPENSE",
        expenseIDToRemove: id
      });
      return get(child(ref(db), `users/${mockUID}/expenses/${id}`));
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test("should setup edit expense action object", () => {
  const action = editExpense("123abc", { note: "new note value" });
  // toBe does not work properly because it compares with === which will never work for two separate objects even if they have the same info
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: { note: "new note value" }
  });
});

test("should setup edit expense from firebase", (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseID = expenses[0].id;
  const updates = { note: "sha la la la" };

  store
    .dispatch(startEditExpense(expenseID, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "EDIT_EXPENSE",
        id: expenseID,
        updates
      });
      return get(child(ref(db), `users/${mockUID}/expenses/${expenseID}`));
    })
    .then((snapshot) => {
      expect(snapshot.val().note).toBe(updates.note);
      done();
    });
});

// changed the 2 tests below after asynchronous chages to expense actions
test("should setup add expense action object with provided values", () => {
  // const expenseData = {
  //   description: "Rent",
  //   amount: 109500,
  //   createdAt: 100,
  //   note: "last rent"
  // };

  const action = addExpense(expenses[2] /* expenseData */);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2] /* {
      ...expenseData,
      id: expect.any(String)
    } */
  });
});

// test("should setup add expense action object with default values", () => {
//   const defaultExpenseData = {
//     description: "",
//     note: "",
//     amount: 0,
//     createdAt: 0
//   };

//   const action = addExpense();
//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       ...defaultExpenseData,
//       id: expect.any(String)
//     }
//   });
// });

test("should add expense to database and store", (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseToAdd = {
    description: "Rice",
    note: "good food",
    amount: 699,
    createdAt: 0
  };

  // we have to tell jest that a function is asynchronous to force it to wait
  store.dispatch(startAddExpense(expenseToAdd)).then(() => {
    /* expect(1).toBe(2);
    //try removing done to see it doesn't detect
    done(); */

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...expenseToAdd
      }
    });

    return get(
      child(ref(db), `users/${mockUID}/expenses/${actions[0].expense.id}`)
    ).then((snapshot) => {
      if (snapshot.exists()) {
        expect(snapshot.val()).toEqual(expenseToAdd);
      } else {
        console.log("No data available");
      }
      done();
    });
  });
});

test("should add expense with defaults to database and store", (done) => {
  const store = createMockStore(defaultAuthState);
  const defaultExpenseToAdd = {
    description: "",
    note: "",
    amount: 0,
    createdAt: 0
  };

  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...defaultExpenseToAdd
      }
    });

    return get(
      child(ref(db), `users/${mockUID}/expenses/${actions[0].expense.id}`)
    ).then((snapshot) => {
      if (snapshot.exists()) {
        expect(snapshot.val()).toEqual(defaultExpenseToAdd);
      } else {
        console.log("No data available");
      }
      done();
    });
  });
});

test("should setup set expense action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  });
});

test("should fetch the expenses from firebase", (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses
    });
    done();
  });
});
