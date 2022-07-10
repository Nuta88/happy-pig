import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

import {FundsService} from '../funds.service';
import {Fund, TAddFundModalConfig, TRemoveFundModalConfig} from '../../../shared/models/fund';
import {AddFundModalComponent} from '../modals/add-fund-modal/add-fund-modal.component';
import {ConfirmModalComponent} from '../../../shared/components/modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss']
})
export class FundsComponent implements OnInit, OnDestroy {
  funds: Array<Fund>;
  subscription: Subscription;

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
    this.fundService.getAll()
      .subscribe({
        next: (funds: Fund[]) => this.funds = funds,
        error: () => this.funds = []
      });
  };

  openAddModal = () => {
    const addFundModalConfig: TAddFundModalConfig = {
      width: '650px',
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '100ms',
      data: {fund: new Fund()}
    };
    const dialogRef = this.dialog.open(AddFundModalComponent, addFundModalConfig);

    dialogRef.afterClosed().subscribe((fund: Fund) => this.onSaveFund(fund));
  };

  openRemoveModal = (fund: Fund) => {
    const modalConfirm: TRemoveFundModalConfig = {
      enterAnimationDuration: '600ms',
      exitAnimationDuration: '100ms',
      data: {title: `fund "${fund.name}"`}
    };
    const dialogRef = this.dialog.open(ConfirmModalComponent, modalConfirm);

    dialogRef.afterClosed().subscribe((isRemove: boolean) => this.onRemoveFund(isRemove, fund.id as number));
  };

  onSaveFund = (fund: Fund): void => {
    if (fund) {
      fund.plannedAmount = fund.plannedAmount * 100;
      this.fundService.create(fund);
    }
  };

  removeFundBy = (id: number) => this.funds = this.funds.filter(fund => fund.id !== id);

  onRemoveFund = (isRemove: boolean, fundId: number) => {
    if (isRemove) {
      this.fundService.remove(fundId).subscribe(() => this.removeFundBy(fundId));
    }
  };
}
