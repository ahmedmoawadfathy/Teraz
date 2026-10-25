import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import type { Product } from '@/features/catalogue/types';
import type { CartItem } from '../types';

type CartValue = {
  items: CartItem[];
  itemCount: number;
  total: number;
  addToCart: (product: Product, size?: string, quantity?: number) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeFromCart: (lineId: string) => void;
  isInCart: (productId: string) => boolean;
  clearCart: () => void;
};

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size?: string, quantity = 1) => {
    const lineId = size ? `${product.id}-${size}` : product.id;
    setItems((current) =>
      current.some((item) => item.lineId === lineId)
        ? current.map((item) => (item.lineId === lineId ? { ...item, quantity: item.quantity + quantity } : item))
        : [...current, { lineId, product, quantity, size }],
    );
  };

  const removeFromCart = (lineId: string) =>
    setItems((current) => current.filter((item) => item.lineId !== lineId));

  const updateQuantity = (lineId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(lineId);
      return;
    }
    setItems((current) => current.map((item) => (item.lineId === lineId ? { ...item, quantity } : item)));
  };

  const isInCart = (productId: string) => items.some((item) => item.product.id === productId);

  const clearCart = () => setItems([]);

  // The total is calculated from the items, so it always updates with the cart.
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, itemCount, total, addToCart, updateQuantity, removeFromCart, isInCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart must be inside CartProvider');
  return value;
}
