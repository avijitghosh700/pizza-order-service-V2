import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { Pizza } from 'src/app/helpers';
import { clearCart, State } from 'src/app/store';
import * as fromReducer from 'src/app/store/reducers';

declare const StripeCheckout: StripeCheckoutStatic;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class CheckoutMainComponent implements OnInit, OnDestroy {
  public cartItems$!: Observable<Pizza[]>;
  public cartTotal$!: Observable<number>;
  
  public isCOD: boolean = false;
  public total!: number;

  public methods!: Array<{ title: string; id: string; }>;
  
  public checkoutHandler!: StripeCheckoutHandler;

  private destroy$: Subject<void> = new Subject();
  
  constructor(
    private store: Store<State>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.methods = [
      { id: Math.random().toString(36).substring(2,10), title: 'Cash On Delivery', },
      { id: Math.random().toString(36).substring(2,10), title: 'Credit/Debit Card', },
    ];

    this.cartItems$ = this.store.select(fromReducer.selectCartItems);
    
    this.cartTotal$ = this.store.select(fromReducer.selectCartTotal)
      .pipe(
        map(value => this.total = value || 0),
        takeUntil(this.destroy$)
      );

    this.checkoutHandler = StripeCheckout.configure({
      key: 'pk_test_51KQpDNSIx1Jh3nTpTqE2Wbaq3bVOHl6L9fyxy162DI8VJueuDkSBj4VAnr4sk7vN7DQojZ5j31K3D7Awgly2kf5F00ZlLNQZ7N',
      locale: 'auto',
      source: async (source) => {
        this.store.dispatch(clearCart());
        this.router.navigateByUrl('/checkout/success');
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openStripeModal(method: { id: string; title: string; }) {
    if (!method.title.toLocaleLowerCase().includes('card')) {
      this.isCOD = true;

      return;
    }
    
    this.isCOD = false;
    this.checkoutHandler.open({
      name: 'Pizza Delivery Service V2.0',
      amount: (this.total * 100),
      currency: 'INR',
    });
  }

  @HostListener('window:popstate') onPopstate() {
    this.checkoutHandler.close();
  }

  checkoutCOD() {
    this.store.dispatch(clearCart());
    this.router.navigateByUrl('/checkout/success');
  }
}
