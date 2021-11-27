import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Pizza } from 'src/app/helpers';
import { addToCart, removeFromCart } from 'src/app/store';

@Component({
  selector: 'app-qty-selector',
  templateUrl: './qty-selector.component.html',
  styleUrls: ['./qty-selector.component.scss']
})
export class QtySelectorComponent implements OnInit {
  @Input('pizza') pizza: Pizza | null = null;

  constructor(private store: Store<Store>) { }

  ngOnInit(): void {
  }

  increment() {
    this.store.dispatch(addToCart({ payload: <Pizza>this.pizza }));
  }

  decrement() {
    this.store.dispatch(removeFromCart({ payload: <Pizza>this.pizza }));
  }

}
