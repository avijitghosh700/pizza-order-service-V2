import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromReduders from 'src/app/store/reducers';

import { Currency, CurrencyModel, Pizza, State } from 'src/app/helpers';

@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.scss']
})
export class PizzaCardComponent implements OnInit {
  @Input('pizza-data') pizza: Pizza | null = null;

  public currency: CurrencyModel = {
    inr: Currency.india,
    usd: Currency.usa,
  }

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.getCartItemState();
  }

  getCartItemState() {
    this.store.select(fromReduders.selectCartPizza(this.pizza))
      .subscribe({
        next: (res) => {
          if (res && Object.keys(res).length) {
            this.pizza = res;
          }
        }
      });
  }
}
