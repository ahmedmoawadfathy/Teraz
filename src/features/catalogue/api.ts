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

// "You may also like": other pieces from the same category, in stock first.
export async function getRelatedProducts(product: Product, limit = 6): Promise<Product[]> {
  return PRODUCTS.filter((item) => item.id !== product.id && item.category === product.category)
    .sort((a, b) => Number(b.inStock) - Number(a.inStock))
    .slice(0, limit);
}

// Percentage saved when a product is on sale, e.g. 19 for 19% off.
export function discountPercent(product: Product) {
  if (!product.compareAtPrice || product.compareAtPrice <= product.price) return 0;
  return Math.round((1 - product.price / product.compareAtPrice) * 100);
}

export function formatPrice(price: number) {
  return `EGP ${price.toLocaleString('en-US')}`;
}
