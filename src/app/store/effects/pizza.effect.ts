import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { Pizza } from "src/app/helpers";
import { PizzaService } from "src/app/services/pizza/pizza.service";
import * as fromActions from '../actions';

@Injectable()
export class PizzaEffect {
  constructor(
    private actions$: Actions,
    private pizzaService: PizzaService,
  ) {}

  pizzas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadPizzas),
      mergeMap(() => this.pizzaService.getPizzas().pipe(
        map((data) => {
          const pizzas = <Pizza[]>data['pizza'].map((item: Pizza) => ({ ...item, orders: { count: 0, price: 0 } }));
          return fromActions.loadPizzasSuccess({ payload: pizzas });
        }),
        catchError((error) => of(fromActions.loadPizzasFailure({ error })))
      )),
    )
  );
}