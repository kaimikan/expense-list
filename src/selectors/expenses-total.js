// Get total of expenses amounts
export default (expenses) => {
  var expensesAmounts = expenses.map((expense) => {
    return expense.amount;
  });
  return expensesAmounts.reduce((accumulator, expenseAmount) => {
    return accumulator + expenseAmount;
  }, 0);

  /* 
  short-form
  return expenses
  .map((expense) => expense.amount)
  .reduce((sum, value) => sum + value, 0); 
  */
};
