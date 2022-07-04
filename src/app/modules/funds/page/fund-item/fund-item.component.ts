import {Component, Input, OnInit} from '@angular/core';
import {Fund} from '../../../../shared/models/fund';

@Component({
  selector: 'app-fund-item',
  templateUrl: './fund-item.component.html',
  styleUrls: ['./fund-item.component.scss']
})
export class FundItemComponent implements OnInit {
  @Input() fund: Fund;
  @Input() onRemoveFund: (fund: Fund) => void;
  percentage: number = 0;
  fundDetailsApi: string;

  constructor() {
  }

  ngOnInit(): void {
    this.percentage = 100 - (((this.fund.currentAmount ?? 0) / this.fund.plannedAmount) * 100);
    this.fundDetailsApi = `/funds/${this.fund.id}`
  }

  getCurrentAmount = () => (this.fund.currentAmount ?? 0) / 100;

  handleRemoveFund = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    this.onRemoveFund(this.fund);
    return false;
  }
}
