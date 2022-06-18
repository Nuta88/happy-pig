import { Component, OnInit } from '@angular/core';

import { FundsService } from '../funds.service';
import { Fund } from '../../../shared/models/fund';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss']
})
export class FundsComponent implements OnInit {
  funds: Array<Fund>;

  constructor( private fundService: FundsService ) {}

  ngOnInit() {
    this.getAllFunds();
  }

  getAllFunds(): void {
    this.fundService.getFunds()
      .subscribe(
        funds => this.funds = funds,
        () => this.funds = []
      );
  }
}
