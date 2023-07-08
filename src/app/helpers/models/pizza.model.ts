export interface Pizza {
  id: string;
  image: string;
  name: string;
  price: number;
  orders: Orders;
  stock: number;
  currency: string;
}

export interface Orders {
  count: number;
  price: number;
}

export interface Cart {
  totalOrders: number;
  records: Pizza[];
  items: Pizza[];
}

export interface PizzaState {
  data: Pizza[];
  loading: boolean;
  loaded: boolean;
}

export interface State {
  pizzas: PizzaState;
  cart: Cart;
}