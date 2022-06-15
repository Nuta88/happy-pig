import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';

import { FundsRoutingModule } from './funds-routing.module';
import { FundsComponent } from './page/funds.component';
import { FundItemComponent } from './page/fund-item/fund-item.component';
import { FundsService } from './funds.service';
import { FundDetailsComponent } from './page/fund-details/fund-details.component';


@NgModule({
  declarations: [
    FundsComponent,
    FundItemComponent,
    FundDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FundsRoutingModule,
    MatGridListModule,
    MatProgressBarModule,
    MatRippleModule
  ],
  providers: [ FundsService ]
})
export class FundsModule { }
