import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '@/features/catalogue/api';
import type { Product } from '@/features/catalogue/types';
import { getRecommendations } from '../stylingRules';
import type { StylingRequest } from '../types';

export function useStylingResults(request: StylingRequest) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError('We could not load the catalogue. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  const { ties, belts } = useMemo(() => getRecommendations(request, products), [request, products]);

  return { ties, belts, hasMatches: ties.length + belts.length > 0, loading, error };
}
