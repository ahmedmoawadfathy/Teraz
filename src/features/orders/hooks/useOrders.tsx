import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import type { CartItem } from '@/features/cart/types';
import { PAST_ORDERS } from '../api';
import type { Order } from '../types';

type OrdersValue = {
  orders: Order[];
  getOrder: (orderId: string) => Order | undefined;
  placeOrder: (items: CartItem[], deliveryAddress: string, phone: string) => Order;
};

const OrdersContext = createContext<OrdersValue | null>(null);

export function OrdersProvider({ children }: PropsWithChildren) {
  const [orders, setOrders] = useState<Order[]>(PAST_ORDERS);

  const getOrder = (orderId: string) => orders.find((order) => order.id === orderId);

  const placeOrder = (items: CartItem[], deliveryAddress: string, phone: string) => {
    const order: Order = {
      id: `BRV-${1058 + orders.length}`,
      orderDate: new Date().toISOString(),
      status: 'Processing',
      totalPrice: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      deliveryAddress,
      phone,
      items: items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
      })),
    };
    setOrders((current) => [order, ...current]);
    return order;
  };

  return (
    <OrdersContext.Provider value={{ orders, getOrder, placeOrder }}>{children}</OrdersContext.Provider>
  );
}

export function useOrders() {
  const value = useContext(OrdersContext);
  if (!value) throw new Error('useOrders must be inside OrdersProvider');
  return value;
}
