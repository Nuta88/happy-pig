import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {FundsService} from '../../funds.service';
import {Fund, TExpensesModalConfig} from '../../../../shared/models/fund';
import {AddExpensesModalComponent} from '../../modals/add-expenses-modal/add-expenses-modal.component';
import {Expense} from '../../../../shared/models/expense';
import {TModalConfig} from '../../../../shared/models/modal';
import {convertToCurrency, convertToPennies, numberWithSpace, upsertExpense} from '../../../../shared/utils/funds';

@Component({
  selector: 'app-fund-details',
  templateUrl: './fund-details.component.html',
  styleUrls: ['./fund-details.component.scss']
})
export class FundDetailsComponent implements OnInit {
  displayedColumns: string[] = ['recipient', 'paymentAmount', 'description', 'actions'];
  expensesModalConfig: TModalConfig = {
    width: '650px',
    enterAnimationDuration: '400ms',
    exitAnimationDuration: '100ms',
  };
  fund: Fund;
  id: number | null;

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
    this.id = paramsId && paramsId.length ? Number(paramsId) : null;
  };

  getFund = (): void => {
    if (this.id) {
      this.fundService.getById(this.id).subscribe((res: Fund) => {
        this.fund = res;
      });
    }
  };

  back = (): void => {
    this.router.navigateByUrl('/funds');
  };

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

  onSaveExpenses = (expense: Expense | undefined) => {
    if (expense && this.id) {
      expense.paymentAmount = convertToPennies(expense.paymentAmount);
      this.fund.expenses = upsertExpense(this.fund.expenses, expense);

      this.fundService.update(this.fund, this.id)
        .subscribe((res: Fund) => {
          this.fund = res;
        });
    }
  };

  getCurrentAmount = (amount: number) => numberWithSpace(convertToCurrency(amount));

  getExpensesAmount = () => {
    const expensesAmount = this.fund?.plannedAmount - (this.fund?.currentAmount ?? 0);

    return this.getCurrentAmount(expensesAmount);
  }
}
