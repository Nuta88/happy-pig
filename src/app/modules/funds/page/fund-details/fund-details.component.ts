import {Component, ContentChild, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatNoDataRow, MatTableDataSource} from '@angular/material/table';
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
  tableColumns: string[] = ['recipient', 'paymentAmount', 'description', 'actions'];
  isEditFundName: boolean = false;
  expensesModalConfig: TModalConfig = {
    width: '40.3rem',
    enterAnimationDuration: '400ms',
    exitAnimationDuration: '100ms',
  };
  fund: Fund = new Fund();
  fundId: number | null;
  fundName: FormControl<string | null>;
  tablePageSize: number[] = [5, 8];
  dataSource = new MatTableDataSource<Expense>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow;

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getParamId = (): void => {
    const paramsId = this.route.snapshot.paramMap.get('id');
    this.fundId = paramsId && paramsId.length ? Number(paramsId) : null;
  };

  getFund = (): void => {
    if (this.fundId) {
      this.fundService.getById(this.fundId).subscribe((fund: Fund) => {
        this.fund = fund;
        this.updateTableDataSource();
        this.setFormFundName(fund);
      });
    }
  };

  setFormFundName = (fund: Fund): void => {
    this.fundName = new FormControl(fund.name, [Validators.required]);
  }

  updateTableDataSource = (): void => {
    this.dataSource.data = this.fund.expenses;
  }

  onEditFundName = (event: MouseEvent): void => {
    event.stopPropagation();
    this.isEditFundName = true;
  }

  closeEditFundName = (): void => {
    if (this.isEditFundName && this.fundName.value) {
      this.onUpdateFundName();
    }
  }

  onUpdateFundName = (): void => {
    if (this.fund.name !== this.fundName.value) {
      this.onUpdateFund({...this.fund, name: this.fundName.value as string});
    }
  }

  back = (): void => {
    this.router.navigateByUrl('/funds');
  };

  getCurrentAmount = (amount: number): string => numberWithSpace(convertToCurrency(amount));

  getExpensesAmount = (): string => {
    const expensesAmount = this.fund?.plannedAmount - (this.fund?.currentAmount ?? 0);

    return this.getCurrentAmount(expensesAmount);
  }

  onUpdateFund = (fund: Fund): void => {
    if (this.fundId) {
      this.fundService.update(fund, this.fundId)
        .subscribe((res: Fund) => {
          this.fund = res;
          this.updateTableDataSource();

          if (this.isEditFundName) this.isEditFundName = false;
        });
    }
  };

  onSaveExpenses = (expense: Expense | undefined): void => {
    if (expense) {
      expense.paymentAmount = convertToPennies(expense.paymentAmount);
      const expenses = upsertExpense(this.fund.expenses, expense);

      this.onUpdateFund({...this.fund, expenses});
    }
  };

  onRemoveExpenses = (isRemove: boolean, id: number | null): void => {
    if (isRemove && id) {
      const expenses = this.fund.expenses.filter(expense => expense.id !== id);

      this.onUpdateFund({...this.fund, expenses});
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

  openRemoveModal = (expense: Expense): void => {
    const modalConfirm: TRemoveFundModalConfig = {
      enterAnimationDuration: '600ms',
      exitAnimationDuration: '100ms',
      data: {title: `expense for "${expense.recipient}"`}
    };
    const dialogRef = this.dialog.open(ConfirmModalComponent, modalConfirm);

    dialogRef.afterClosed().subscribe((isRemove: boolean) => this.onRemoveExpenses(isRemove, expense.id));
  };
}
