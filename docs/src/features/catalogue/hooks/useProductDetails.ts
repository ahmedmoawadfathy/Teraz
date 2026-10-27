import { useEffect, useState } from 'react';
import { useCart } from '@/features/cart/hooks/useCart';
import { getProductById, getRelatedProducts } from '../api';
import type { Product } from '../types';

export function useProductDetails(productId: string) {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [size, setSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSize(null);
    setSizeError(null);
    setQuantity(1);
    setAdded(false);
    getProductById(productId)
      .then(async (found) => {
        setProduct(found);
        if (!found) {
          setError('This product is no longer available.');
          return;
        }
        setRelated(await getRelatedProducts(found));
      })
      .catch(() => setError('We could not load this product. Please try again.'))
      .finally(() => setLoading(false));
  }, [productId]);

  function chooseSize(value: string) {
    setSize(value);
    setSizeError(null);
  }

  function changeQuantity(next: number) {
    setQuantity(Math.min(10, Math.max(1, next)));
  }

  function add() {
    if (!product || !product.inStock) return false;
    if (product.sizes && !size) {
      setSizeError('Please choose a size.');
      return false;
    }
    addToCart(product, size ?? undefined, quantity);
    setAdded(true);
    return true;
  }

  return {
    product,
    related,
    loading,
    error,
    size,
    chooseSize,
    sizeError,
    quantity,
    changeQuantity,
    added,
    add,
  };
}
