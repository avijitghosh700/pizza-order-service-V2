import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Cart, Pizza } from 'src/app/helpers';
import { State } from 'src/app/store';
import * as fromReducers from 'src/app/store/reducers';

@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.scss']
})
export class CartPreviewComponent implements OnInit {
  public cart: Cart | null = null;
  public cartItems: Pizza[] = [];
  public subtotal: number | null = null;
  public isCartExpanded: boolean = false;

  constructor(
    public store: Store<State>,
  ) {}

  ngOnInit(): void {
    this.getState();
  }

  getState() {
    this.store.select(fromReducers.selectCart).subscribe({
      next: (res) => {
        if (res && Object.keys(res).length) {
          this.cart = res;
          this.cartItems = this.cart.items;

          if (!this.cartItems.length) this.isCartExpanded = false;
          
          this.subtotal = this.cartItems.reduce((acc, curr) => (acc += curr.orders.price), 0);
          console.log(this.subtotal);

        }
      }
    });
  }

  toggleCart() {
    this.isCartExpanded = !this.isCartExpanded;
  }
  
  expandCart() {
    this.isCartExpanded = true;
  }

  collapseCart() {
    this.isCartExpanded = false;
  }
}
