import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

import {FundsService} from '../funds.service';
import {AddFundModalConfig, Fund} from '../../../shared/models/fund';
import {AddFundModalComponent} from '../modals/add-fund-modal/add-fund-modal.component';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss']
})
export class FundsComponent implements OnInit, OnDestroy {
  funds: Array<Fund>;
  subscription: Subscription;
  addFundModalConfig: AddFundModalConfig = {
    width: '650px',
    data: {fund: new Fund()}
  };

  constructor(public dialog: MatDialog, private fundService: FundsService) {
    this.subscription = this.fundService.getSavedFund().subscribe(res => {
      this.funds.push(res.fund);
    });
  }

  ngOnInit() {
    this.getList();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getList = (): void => {
    this.fundService.getFunds()
      .subscribe(
        funds => this.funds = funds,
        () => this.funds = []
      );
  };

  openAddModal = () => {
    const dialogRef = this.dialog.open(AddFundModalComponent, this.addFundModalConfig);

    dialogRef.afterClosed().subscribe((fund: Fund) => this.onSaveFund(fund));
  };

  onSaveFund = (fund: Fund): void => {
    if (fund) {
      fund.plannedAmount = fund.plannedAmount * 100;
      this.fundService.create(fund);
    }
  };
}
