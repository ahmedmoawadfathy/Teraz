import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../api';
import type { Category, Product } from '../types';

export type PriceRange = 'all' | 'under500' | '500to650' | 'over650';

export const PRICE_RANGES: { value: PriceRange; label: string }[] = [
  { value: 'all', label: 'Any price' },
  { value: 'under500', label: 'Under 500' },
  { value: '500to650', label: '500 – 650' },
  { value: 'over650', label: 'Over 650' },
];

function inPriceRange(price: number, range: PriceRange) {
  if (range === 'under500') return price < 500;
  if (range === '500to650') return price >= 500 && price <= 650;
  if (range === 'over650') return price > 650;
  return true;
}

export function useProductSearch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [colour, setColour] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>('all');

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError('We could not load products. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  // Only the colours that exist in the catalogue are offered as filters.
  const colourOptions = useMemo(
    () => Array.from(new Set(products.map((product) => product.colour))),
    [products],
  );

  const results = useMemo(() => {
    const text = query.trim().toLowerCase();
    return products.filter(
      (product) =>
        (text === '' ||
          product.name.toLowerCase().includes(text) ||
          product.style.toLowerCase().includes(text)) &&
        (category === 'all' || product.category === category) &&
        (colour === null || product.colour === colour) &&
        inPriceRange(product.price, priceRange),
    );
  }, [products, query, category, colour, priceRange]);

  const hasFilters = query !== '' || category !== 'all' || colour !== null || priceRange !== 'all';

  function clearFilters() {
    setQuery('');
    setCategory('all');
    setColour(null);
    setPriceRange('all');
  }

  return {
    loading,
    error,
    results,
    colourOptions,
    query,
    setQuery,
    category,
    setCategory,
    colour,
    setColour,
    priceRange,
    setPriceRange,
    hasFilters,
    clearFilters,
  };
}
