import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Pizza } from 'src/app/helpers';
import { addToCart, removeFromCart, State } from 'src/app/store';
import * as fromReduders from 'src/app/store/reducers';

@Component({
  selector: 'app-qty-selector',
  templateUrl: './qty-selector.component.html',
  styleUrls: ['./qty-selector.component.scss']
})
export class QtySelectorComponent implements OnInit, OnChanges {
  @Input('pizza') pizza: Pizza | null = null;

  constructor(private store: Store<State>) { }

  ngOnChanges() {
  }

  ngOnInit(): void {
  }

  increment() {
    this.store.dispatch(addToCart({ payload: <Pizza>this.pizza }));
  }

  decrement() {
    this.store.dispatch(removeFromCart({ payload: <Pizza>this.pizza }));
    this.getCartItemState();
  }

  getCartItemState() {
    this.store.select(fromReduders.selectCart).subscribe({
      next: (res) => {
        if (res && Object.keys(res).length) {
          const pizza = res.items.find((item) => item.id === this.pizza?.id);

          if (!pizza) this.pizza = null;
        }
      }
    });
  }

}
