import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';

import {FundsService} from '../../funds.service';
import {Fund, TExpensesModalConfig, TRemoveFundModalConfig} from '../../../../shared/models/fund';
import {AddExpensesModalComponent} from '../../modals/add-expenses-modal/add-expenses-modal.component';
import {Expense} from '../../../../shared/models/expense';
import {TModalConfig} from '../../../../shared/models/modal';
import {convertToCurrency, convertToPennies, numberWithSpace, upsertExpense} from '../../../../shared/utils/funds';
import {ConfirmModalComponent} from "../../../../shared/components/modals/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-fund-details',
  templateUrl: './fund-details.component.html',
  styleUrls: ['./fund-details.component.scss']
})
export class FundDetailsComponent implements OnInit {
  displayedColumns: string[] = ['recipient', 'paymentAmount', 'description', 'actions'];
  isEditFundName: boolean = false;
  expensesModalConfig: TModalConfig = {
    width: '40.3rem',
    enterAnimationDuration: '400ms',
    exitAnimationDuration: '100ms',
  };
  fund: Fund = new Fund();
  fundId: number | null;
  fundName: FormControl<string | null>;

  constructor(
    private fundService: FundsService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getParamId();
    this.getFund();
  }

  getParamId = (): void => {
    const paramsId = this.route.snapshot.paramMap.get('id');
    this.fundId = paramsId && paramsId.length ? Number(paramsId) : null;
  };

  getFund = (): void => {
    if (this.fundId) {
      this.fundService.getById(this.fundId).subscribe((fund: Fund) => {
        this.fund = fund;
        this.fundName = new FormControl(fund.name, [Validators.required]);
      });
    }
  };

  onEditFundName = (event: MouseEvent) => {
    event.stopPropagation();
    this.isEditFundName = true;
  }

  closeEditFundName = () => {
    if (this.isEditFundName && this.fundName.value) {
      this.isEditFundName = false;
      this.onUpdateFundName()
    }
  }

  onUpdateFundName = () => {
    if (this.fund.name !== this.fundName.value) {
      this.fund.name = this.fundName.value as string;
      this.onUpdateFund();
    }
  }

  back = (): void => {
    this.router.navigateByUrl('/funds');
  };

  getCurrentAmount = (amount: number) => numberWithSpace(convertToCurrency(amount));

  getExpensesAmount = () => {
    const expensesAmount = this.fund?.plannedAmount - (this.fund?.currentAmount ?? 0);

    return this.getCurrentAmount(expensesAmount);
  }

  onUpdateFund = () => {
    if (this.fundId) {
      this.fundService.update(this.fund, this.fundId)
        .subscribe((res: Fund) => {
          this.fund = res;
        });
    }
  };

  onSaveExpenses = (expense: Expense | undefined) => {
    if (expense) {
      expense.paymentAmount = convertToPennies(expense.paymentAmount);
      this.fund.expenses = upsertExpense(this.fund.expenses, expense);

      this.onUpdateFund();
    }
  };

  onRemoveFund = (isRemove: boolean, id: number | null) => {
    if (isRemove && id) {
      this.fund.expenses = this.fund.expenses.filter(expense => expense.id !== id);

      this.onUpdateFund();
    }
  }

  openAddModal = (): void => {
    const addModalConfig: TExpensesModalConfig = {
      ...this.expensesModalConfig,
      data: {
        expense: new Expense(),
        title: 'Create Expense'
      }
    };
    const dialogRef = this.dialog.open(AddExpensesModalComponent, addModalConfig);

    dialogRef.afterClosed().subscribe((expense) => this.onSaveExpenses(expense));
  };

  openEditModal = (expense: Expense): void => {
    const addModalConfig: TExpensesModalConfig = {
      ...this.expensesModalConfig,
      data: {
        expense: {...expense},
        title: 'Edit Expense'
      }
    };
    const dialogRef = this.dialog.open(AddExpensesModalComponent, addModalConfig);

    dialogRef.afterClosed().subscribe((expense) => this.onSaveExpenses(expense));
  };

  openRemoveModal = (expense: Expense) => {
    const modalConfirm: TRemoveFundModalConfig = {
      enterAnimationDuration: '600ms',
      exitAnimationDuration: '100ms',
      data: {title: `expense for "${expense.recipient}"`}
    };
    const dialogRef = this.dialog.open(ConfirmModalComponent, modalConfirm);

    dialogRef.afterClosed().subscribe((isRemove: boolean) => this.onRemoveFund(isRemove, expense.id));
  };
}
