import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { addToCart, removeFromCart } from 'src/app/store';

import { Pizza, State } from 'src/app/helpers';

@Component({
  selector: 'app-qty-selector',
  templateUrl: './qty-selector.component.html',
  styleUrls: ['./qty-selector.component.scss'],
})
export class QtySelectorComponent {
  @Input('pizza') pizza: Pizza | null = null;

  constructor(private store: Store<State>) {}

  increment() {
    this.store.dispatch(addToCart({ payload: <Pizza>this.pizza }));
  }

  decrement() {
    this.store.dispatch(removeFromCart({ payload: <Pizza>this.pizza }));
  }
}
