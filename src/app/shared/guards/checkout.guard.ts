import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import * as fromReducers from 'src/app/store/reducers';

import { State } from 'src/app/helpers';

@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard {
  constructor(private store: Store<State>, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.store.select(fromReducers.selectCart).pipe(
      map((cart) => {
        if (cart.items && cart.items.length) {
          return true;
        }

        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
