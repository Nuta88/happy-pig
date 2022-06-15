import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FundsComponent } from './page/funds.component';
import { FundDetailsComponent } from './page/fund-details/fund-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'funds',
    pathMatch: 'full'
  },
  {
    path: 'funds',
    component: FundsComponent
  },
  {
    path: 'funds/:id',
    component: FundDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundsRoutingModule { }
