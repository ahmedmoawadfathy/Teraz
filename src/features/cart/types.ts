import type { Product } from '@/features/catalogue/types';

export type CartItem = {
  lineId: string;
  product: Product;
  quantity: number;
  size?: string;
};
