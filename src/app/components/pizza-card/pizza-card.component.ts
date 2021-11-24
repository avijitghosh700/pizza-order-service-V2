import { Component, Input, OnInit } from '@angular/core';
import { Currency, ICurrency, Pizza } from 'src/app/helpers';

@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.scss']
})
export class PizzaCardComponent implements OnInit {
  @Input('pizza-data') pizza: Pizza | null = null;

  public currency: ICurrency = {
    inr: Currency.india,
    usd: Currency.usa,
  }

  constructor() { }

  ngOnInit(): void {
    // console.log(this.pizza?.id);
  }

}
