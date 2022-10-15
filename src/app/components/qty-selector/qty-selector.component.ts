import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Pizza } from 'src/app/helpers';
import { addToCart, removeFromCart, State } from 'src/app/store';

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
