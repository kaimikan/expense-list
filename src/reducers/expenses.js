// Expenses Reducer
const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      // WAY #1
      // // concat does not change the state variable, makes a copy instead and then changes it
      // return state.concat(action.expense);

      // WAY #2 ARRAY SPREAD OPERATOR ...
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(
        (expenseID) => action.expenseIDToRemove !== expenseID.id
      );
    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            // OBEJCT SPREAD OPERATOR ...
            // we take all of the indivial Expense's values and overwrite
            // only the ones which action.updates has
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};
