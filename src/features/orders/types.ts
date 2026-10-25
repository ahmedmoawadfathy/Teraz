export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered';

export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: string;
  orderDate: string; // ISO date
  status: OrderStatus;
  totalPrice: number;
  deliveryAddress: string;
  phone: string;
  items: OrderItem[];
};
