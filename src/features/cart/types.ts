import type { Product } from '@/features/catalogue/types';

export type CartItem = {
  product: Product;
  quantity: number;
};
