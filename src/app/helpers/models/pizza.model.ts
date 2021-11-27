export interface Pizza {
  id: string;
  image: string;
  name: string;
  price: number;
  orders: number;
  stock: number;
  currency: string;
}

export interface Cart {
  totalOrders: number;
  items: Pizza[];
}