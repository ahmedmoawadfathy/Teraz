import { useState } from 'react';
import { useOrders } from '@/features/orders/hooks/useOrders';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { useCart } from './useCart';

type Errors = { address?: string; phone?: string };

export function useCheckout() {
  const { items, total, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useProfile();

  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.phone);
  const [errors, setErrors] = useState<Errors>({});

  // Validates the delivery details, creates the order and empties the cart.
  // Returns the new order id, or null when something must be fixed first.
  function confirmOrder() {
    const next: Errors = {};
    if (!address.trim()) next.address = 'Enter a delivery address.';
    if (!/^01[0-9]{9}$/.test(phone.trim())) next.phone = 'Enter an 11-digit mobile number starting with 01.';
    setErrors(next);
    if (Object.keys(next).length > 0 || items.length === 0) return null;

    const order = placeOrder(items, address.trim(), phone.trim());
    clearCart();
    return order.id;
  }

  return { items, total, address, setAddress, phone, setPhone, errors, confirmOrder };
}
