import { ActionReducerMap, MetaReducer, createSelector } from "@ngrx/store";
import * as fromReducer from "./pizza.reducers";
import { environment } from "src/environments/environment";
import { State } from "./pizza.reducers";
import { PizzaState } from "..";
import { Cart } from "src/app/helpers";

// Selectors //
export const selectStore = (state: State) => state;
export const selectPizzas = (state: State) => state.pizzas;
export const selectCart = (state: State) => state.cart;

// To pass props in a selector
export const selectPizza = (props: any) => (
  createSelector(
    selectPizzas,
    (state: PizzaState) => state.data.find((pizza) => pizza.id === props.id)
  )
);

export const selectCartPizza = (props: any) => (
  createSelector(
    selectCart,
    (state: Cart) => state.records.find((pizza) => pizza.id === props.id)
  )
);
// END //

export const reducers: ActionReducerMap<fromReducer.State> = {
  pizzas: fromReducer.pizzaReducer,
  cart: fromReducer.cartReducer,
};

export const metaReducers: MetaReducer<fromReducer.State>[] = !environment.production ? [] : [];
