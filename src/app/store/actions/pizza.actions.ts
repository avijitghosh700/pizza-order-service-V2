import { createAction, props } from '@ngrx/store';
import { Cart, Pizza } from 'src/app/helpers';

export const loadPizzas = createAction(
  '[Pizza] Load Pizzas'
);

export const loadPizzasSuccess = createAction(
  '[Pizza] Load Pizzas Success',
  props<{ payload: Pizza[] }>()
);

export const loadPizzasFailure = createAction(
  '[Pizza] Load Pizzas Failure',
  props<{ error: any }>()
);

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ payload: Pizza }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ payload: Pizza }>()
);
