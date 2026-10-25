import type { Product } from '@/features/catalogue/types';

export type CartItem = {
  lineId: string; // product id + size, so each size is its own line
  product: Product;
  quantity: number;
  size?: string;
};
