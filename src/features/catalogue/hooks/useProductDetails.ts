import { useEffect, useState } from 'react';
import { getProductById } from '../api';
import type { Product } from '../types';

export function useProductDetails(productId: string) {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getProductById(productId)
      .then((found) => {
        setProduct(found);
        if (!found) setError('This product is no longer available.');
      })
      .catch(() => setError('We could not load this product. Please try again.'))
      .finally(() => setLoading(false));
  }, [productId]);

  return { product, loading, error };
}
