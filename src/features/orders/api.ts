import type { Order } from './types';

export const PAST_ORDERS: Order[] = [
  {
    id: 'BRV-1042',
    orderDate: '2026-09-28T14:20:00.000Z',
    status: 'Delivered',
    totalPrice: 1100,
    deliveryAddress: '12 Nile Street, Cairo',
    phone: '01001234567',
    items: [
      { productId: 't1', name: 'Navy Silk Tie', quantity: 1, unitPrice: 450 },
      { productId: 'b1', name: 'Classic Black Leather Belt', quantity: 1, unitPrice: 650 },
    ],
  },
  {
    id: 'BRV-1057',
    orderDate: '2026-10-15T10:05:00.000Z',
    status: 'Shipped',
    totalPrice: 1040,
    deliveryAddress: '12 Nile Street, Cairo',
    phone: '01001234567',
    items: [{ productId: 't3', name: 'Silver Satin Tie', quantity: 2, unitPrice: 520 }],
  },
];

export function formatOrderDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
