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

import {FundsRoutingModule} from './funds-routing.module';
import {FundsComponent} from './page/funds.component';
import {FundItemComponent} from './page/fund-item/fund-item.component';
import {FundsService} from './funds.service';
import {FundDetailsComponent} from './page/fund-details/fund-details.component';
import {AddFundModalComponent} from './modals/add-fund-modal/add-fund-modal.component';

@NgModule({
  declarations: [
    FundsComponent,
    FundItemComponent,
    FundDetailsComponent,
    AddFundModalComponent
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
    MatInputModule
  ],
  providers: [FundsService]
})
export class FundsModule {
}
