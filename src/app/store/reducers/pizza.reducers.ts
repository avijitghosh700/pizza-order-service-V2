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
  data: Pizza[];
  loading: boolean;
  loaded: boolean;
}

export interface State {
  pizzas: PizzaState;
  cart: Cart;
}

// Secondary state objects
export const initialPizzaState: PizzaState = {
  data: [],
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

// Reducers
export const deepCopy = (inObject: any) => {
  let outObject: any, value, key;

  if (typeof inObject !== "object" || inObject === null) {
    return inObject // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {}

  for (key in inObject) {
    value = inObject[key]

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopy(value)
  }

  return outObject
}

export const pizzaReducer = createReducer(
  initialPizzaState,
  on(loadPizzas, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadPizzasSuccess, (state, action) => ({
    data: [...state.data, ...action.payload],
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
    const filteredIndex = state.items.findIndex(item => item.id === action.payload.id);
    const clonedState = <Pizza[]>deepCopy(state.items);
    const clonedPayload = <Pizza>deepCopy(action.payload);
    // const clonedState = <Pizza[]>JSON.parse(JSON.stringify(state.items)); // JSON method to deep clone but symbols, DOM nodeList will not be cloned
    
    if (filteredIndex > -1) {
      const clonedStateItem = clonedState[filteredIndex];
      const clonedStateItemOrder = clonedStateItem.orders;

      if (clonedStateItemOrder.count < clonedStateItem.stock) {
        clonedStateItemOrder.count = clonedStateItemOrder.count + 1;
        clonedStateItemOrder.price += clonedStateItem.price;
        
        return {
          items: [...clonedState],
          totalOrders: state.totalOrders + 1,
        }
      } else {
        clonedStateItemOrder.count = clonedStateItem.stock;
        
        return {
          items: [...clonedState],
          totalOrders: state.totalOrders,
        }
      }
    }

    clonedPayload.orders.count = 1;
    clonedPayload.orders.price = clonedPayload.price;
    return {
      items: [...state.items, clonedPayload],
      totalOrders: state.totalOrders + 1,
    }
  }),
  on(removeFromCart, (state, action) => {
    const filteredIndex = state.items.findIndex(item => item.id === action.payload.id);
    const clonedState = <Pizza[]>deepCopy(state.items);

    if (filteredIndex > -1) {
      const clonedStateItem = clonedState[filteredIndex];
      const clonedStateItemOrder = clonedStateItem.orders;
      clonedStateItemOrder.count = clonedStateItemOrder.count - 1;
      clonedStateItemOrder.price -= clonedStateItem.price;

      if (clonedStateItemOrder.count >= 1) {
        return {
          items: [...clonedState],
          totalOrders: state.totalOrders - 1,
        };
      }

      return {
        items: [...clonedState.filter((item) => item.id !== action.payload.id)],
        totalOrders: (state.totalOrders > 0) ? (state.totalOrders - 1) : 0,
      }
    }

    return {
      items: [...clonedState],
      totalOrders: state.totalOrders,
    }
  })
);
// END
