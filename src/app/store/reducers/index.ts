import { ActionReducerMap, MetaReducer, createSelector } from "@ngrx/store";
import * as fromReducer from "./pizza.reducers";
import { Cart, State } from "src/app/helpers";
import { environment } from "src/environments/environment";

// Selectors //
export const selectStore = (state: State) => state;
export const selectPizzas = (state: State) => state.pizzas.data;
export const selectCart = (state: State) => state.cart;
export const selectCartItems = (state: State) => state.cart.items;
export const selectCartTotal = (state: State) => state.cart.items.reduce((prev, curr) => (prev += curr.orders.price), 0);

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

export const reducers: ActionReducerMap<State> = {
  pizzas: fromReducer.pizzaReducer,
  cart: fromReducer.cartReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
