import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import type { Product } from '@/features/catalogue/types';
import type { CartItem } from '../types';

type CartValue = {
  items: CartItem[];
  itemCount: number;
  total: number;
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) =>
    setItems((current) =>
      current.some((item) => item.product.id === product.id)
        ? current.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...current, { product, quantity: 1 }],
    );

  const removeFromCart = (productId: string) =>
    setItems((current) => current.filter((item) => item.product.id !== productId));

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setItems((current) =>
      current.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => setItems([]);

  // The total is calculated from the items, so it always updates with the cart.
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, itemCount, total, addToCart, updateQuantity, removeFromCart, clearCart }}
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
