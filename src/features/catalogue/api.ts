import { PRODUCTS } from './data';
import type { Product } from './types';

// Model: the only place screens get product data from.
// Phase 1 returns the local catalogue; Phase 2 swaps this for the database.
export async function getProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return PRODUCTS.find((product) => product.id === id);
}

export function formatPrice(price: number) {
  return `EGP ${price.toLocaleString('en-US')}`;
}
