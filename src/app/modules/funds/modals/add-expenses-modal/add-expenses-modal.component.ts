import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgModel} from '@angular/forms';
import * as moment from 'moment';

import {TExpenses} from '../../../../shared/models/fund';
import {convertToCurrency} from '../../../../shared/utils/funds';

@Component({
  selector: 'app-add-expenses-modal',
  templateUrl: './add-expenses-modal.component.html',
  styleUrls: ['./add-expenses-modal.component.scss']
})
export class AddExpensesModalComponent {
  @ViewChild('recipient') recipient: NgModel;
  @ViewChild('amount') amount: NgModel;
  @ViewChild('date') date: NgModel;
  @ViewChild('desc') desc: NgModel;

  constructor(
    public dialogRef: MatDialogRef<AddExpensesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TExpenses) {
    this.data.expense.paymentAmount = convertToCurrency(this.data.expense.paymentAmount);
  }

  onNoClick = (): void => this.dialogRef.close();


  onChangeData = (): void => {
    this.data.expense.date = moment(this.data.expense.date).format('YYYY-MM-DD');
  }

  isTheDateAvailable = (d: Date | null): boolean => {
    const data = d || new Date();

    return moment(data).isBefore(moment()) || moment(data).isSame(moment(), 'day');
  };

  isFieldsUnmodified = (): boolean => {
    return !(this.recipient?.pristine || this.amount?.dirty || this.date?.dirty || this.desc?.dirty);
  }

  isFieldsEmpty = (): boolean => !(this.recipient?.value || this.amount?.value);

  isDisabledSaveButton = (): boolean => this.isFieldsEmpty() || this.isFieldsUnmodified();
}
