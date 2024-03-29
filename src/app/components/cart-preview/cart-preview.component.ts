import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromReducers from 'src/app/store/reducers';

import { Cart, Pizza, State } from 'src/app/helpers';

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
    private router: Router,
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

  checkout() {
    this.router.navigateByUrl('/checkout');
  }
}
