import { ActionReducerMap, MetaReducer, createSelector } from "@ngrx/store";
import * as fromReducer from "./pizza.reducers";
import { State } from "./pizza.reducers";
import { Cart } from "src/app/helpers";
import { environment } from "src/environments/environment";

// Selectors //
export const selectStore = (state: State) => state;
export const selectPizzas = (state: State) => state.pizzas.data;
export const selectCart = (state: State) => state.cart;

// To pass props in a selector
export const selectPizza = (props: any) => (
  createSelector(
    selectPizzas,
    (state) => state.find((pizza) => pizza.id === props.id)
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
