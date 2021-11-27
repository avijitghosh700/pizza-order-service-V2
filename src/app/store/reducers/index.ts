import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import * as fromReducer from "./pizza.reducers";
import { environment } from "src/environments/environment";

export const reducers: ActionReducerMap<fromReducer.State> = {
  pizzas: fromReducer.pizzaReducer,
  cart: fromReducer.cartReducer,
};

export const metaReducers: MetaReducer<fromReducer.State>[] = !environment.production ? [] : [];
