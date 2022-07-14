import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {ClickOutsideDirective} from '../../shared/directives/clickOutside';
import {FundsRoutingModule} from './funds-routing.module';
import {FundsComponent} from './page/funds.component';
import {FundItemComponent} from './page/fund-item/fund-item.component';
import {FundsService} from './funds.service';
import {FundDetailsComponent} from './page/fund-details/fund-details.component';
import {AddFundModalComponent} from './modals/add-fund-modal/add-fund-modal.component';
import {AddExpensesModalComponent} from './modals/add-expenses-modal/add-expenses-modal.component';

@NgModule({
  declarations: [
    FundsComponent,
    FundItemComponent,
    FundDetailsComponent,
    AddFundModalComponent,
    AddExpensesModalComponent,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FundsRoutingModule,
    MatGridListModule,
    MatProgressBarModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatDatepickerModule
  ],
  providers: [FundsService]
})
export class FundsModule {
}
