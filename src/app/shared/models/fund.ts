import { Expense } from './expense';

export class Fund {
  id: number | null;
  name: string;
  plannedAmount: number;
  currentAmount?: number | null;
  expenses: Array<Expense>;

  constructor( name: string = '',
               id: number  | null = null,
               plannedAmount: number = 0,
               currentAmount: number | null = null,
               expenses: Array<Expense> = [] ) {
    this.id = id;
    this.name = name;
    this.plannedAmount = plannedAmount;
    this.currentAmount = currentAmount;
    this.expenses = expenses;
  }
}
