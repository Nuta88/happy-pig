import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import * as moment from 'moment';

import {TExpenses} from '../../../../shared/models/fund';
import {convertToCurrency} from '../../../../shared/utils/funds';

@Component({
  selector: 'app-add-expenses-modal',
  templateUrl: './add-expenses-modal.component.html',
  styleUrls: ['./add-expenses-modal.component.scss']
})
export class AddExpensesModalComponent {

  constructor(
    public dialogRef: MatDialogRef<AddExpensesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TExpenses) {
    this.data.expense.paymentAmount = convertToCurrency(this.data.expense.paymentAmount);
  }

  onNoClick = (): void => this.dialogRef.close();

  getFormData = () => new FormControl(this.data.expense.date);

  myFilter = (d: Date | null): boolean => {
    const data = d || new Date();
    return moment(data).isBefore(moment()) || moment(data).isSame(moment(), 'day');
  };

  onChangeData = () => {
    this.data.expense.date = moment(this.data.expense.date).format('YYYY-MM-DD')
  }
}
