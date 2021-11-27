import { createReducer, on } from '@ngrx/store';
import {
  addToCart,
  loadPizzas,
  loadPizzasFailure,
  loadPizzasSuccess,
  removeFromCart,
} from '../actions';
import { Pizza, Cart } from '../../helpers';

export interface PizzaState {
  pizzas: Pizza[];
  loading: boolean;
  loaded: boolean;
}

export interface State {
  pizzas: PizzaState;
  cart: Cart;
}

// Secondary state objects
export const initialPizzaState: PizzaState = {
  pizzas: [],
  loaded: false,
  loading: false,
};

export const initialCartState: Cart = {
  totalOrders: 0,
  items: [],
};
// END

// Main store object
export const initialState: State = {
  pizzas: initialPizzaState,
  cart: initialCartState,
};
// END

export const pizzaReducer = createReducer(
  initialPizzaState,
  on(loadPizzas, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadPizzasSuccess, (state, action) => ({
    pizzas: [...state.pizzas, ...action.payload],
    loading: false,
    loaded: true,
  })),
  on(loadPizzasFailure, (state) => ({
    ...state,
    loading: false,
    loaded: false,
  }))
);

export const cartReducer = createReducer(
  initialCartState,
  on(addToCart, (state, action) => {
    const filteredIndex = state.items.length ? state.items.findIndex(item => item.id === action.payload.id) : -1;

    if (filteredIndex > -1) {
      const item = state.items[filteredIndex];
      item.orders = (action.payload.orders <= item.stock) ? action.payload.orders + 1 : item.stock;
      item.price = (item.orders > 0) ? (item.price * item.orders) : item.price;

      return {
        items: [...state.items],
        totalOrders: state.items.reduce((acc, curr) => (acc += curr.orders), 0),
      }
    }

    action.payload.orders++;
    return {
      items: [...state.items, action.payload],
      totalOrders: state.items.reduce((acc, curr) => (acc += curr.orders), 0),
    }
  }),
  on(removeFromCart, (state, action) => {
    const filteredIndex = state.items.length ? state.items.findIndex(item => item.id === action.payload.id) : -1;
    const item = state.items[filteredIndex];
    item.orders = (action.payload.orders >= 0) ? action.payload.orders - 1 : 0;
    item.price = (item.orders > 0) ? (item.price / item.orders) : 0;

    return {
      items: item.orders ? [...state.items] : [...state.items.splice(state.items.indexOf(action.payload), 0)],
      totalOrders: state.items.reduce((acc, curr) => (acc += curr.orders), 0),
    }
  })
);
