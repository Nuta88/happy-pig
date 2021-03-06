import * as moment from 'moment';

export class Expense {
  id: number | null;
  paymentAmount: number;
  recipient: string;
  date?: string;
  description?: string;

  constructor(id: number | null = null,
              paymentAmount: number = 0,
              recipient: string = '',
              date: string = moment().format('YYYY-MM-DD'),
              description: string = '') {
    this.id = id;
    this.paymentAmount = paymentAmount;
    this.date = date;
    this.recipient = recipient;
    this.description = description;
  }
}
