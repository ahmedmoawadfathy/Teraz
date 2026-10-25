import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../api';
import type { Category, Product } from '../types';

export function useCatalogue() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<Category | 'all'>('all');

  function load() {
    setLoading(true);
    setError(null);
    getProducts()
      .then(setProducts)
      .catch(() => setError('We could not load the catalogue. Please try again.'))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  const visibleProducts = useMemo(
    () => (category === 'all' ? products : products.filter((product) => product.category === category)),
    [products, category],
  );

  // In-stock pieces shown in the "New arrivals" carousel.
  const featured = useMemo(() => products.filter((product) => product.inStock).slice(0, 6), [products]);

  return { products: visibleProducts, allProducts: products, featured, loading, error, category, setCategory, reload: load };
}
