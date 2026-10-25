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

  return { products: visibleProducts, loading, error, category, setCategory, reload: load };
}
