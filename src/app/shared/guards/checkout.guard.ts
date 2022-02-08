import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { State } from 'src/app/store';
import * as fromReducers from 'src/app/store/reducers';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {
  constructor(
    private store: Store<State>,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.store.select(fromReducers.selectCart)
      .pipe(
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
