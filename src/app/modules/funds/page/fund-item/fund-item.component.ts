import { Component, OnInit, Input } from '@angular/core';
import { Fund } from '../../../../shared/models/fund';
import { Color } from '../../../../core/constants/funds';

@Component({
  selector: 'app-fund-item',
  templateUrl: './fund-item.component.html',
  styleUrls: ['./fund-item.component.scss']
})
export class FundItemComponent implements OnInit {
  @Input() fund: Fund;
  percentage: number = 0;
  color: string = Color.RIPPLE_COLOR;
  fundDetailsApi: string;

  constructor() { }

  ngOnInit(): void {
    this.percentage = 100 - (((this.fund.currentAmount ?? 0) / this.fund.plannedAmount) * 100);
    this.fundDetailsApi = `/funds/${this.fund.id}`
  }

  public getCurrentAmount = () => (this.fund.currentAmount ?? 0)/100;
}
