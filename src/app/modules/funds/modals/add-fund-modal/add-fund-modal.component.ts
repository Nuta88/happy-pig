import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TFund} from '../../../../shared/models/fund';

@Component({
  selector: 'app-add-fund-modal',
  templateUrl: './add-fund-modal.component.html',
  styleUrls: ['./add-fund-modal.component.scss']
})

export class AddFundModalComponent {

  constructor(
    public dialogRef: MatDialogRef<AddFundModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TFund) {
  }

  onNoClick = (): void => this.dialogRef.close();
}
