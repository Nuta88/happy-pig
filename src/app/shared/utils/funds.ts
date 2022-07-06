import {Expense} from '../models/expense';

export const numberWithSpace = (number: number): string => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const convertToCurrency = (amount: number) => (amount / 100);

export const convertToPennies = (amount: number) => (amount * 100);

export const upsertExpense = (expenses: Expense[], expense: Expense): Expense[] => {
  const elementIndex = expenses.findIndex(e => e.id === expense.id);

  if (elementIndex > -1) {
    expenses[elementIndex] = expense;
  } else {
    expenses.push(expense);
  }

  return expenses;
}
