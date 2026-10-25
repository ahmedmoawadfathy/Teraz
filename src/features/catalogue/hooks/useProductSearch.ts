import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../api';
import type { Category, Product, SortOption } from '../types';

export type Availability = 'all' | 'inStock' | 'outOfStock';

export const AVAILABILITY_OPTIONS: { value: Availability; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'inStock', label: 'In stock' },
  { value: 'outOfStock', label: 'Sold out' },
];

function sortProducts(products: Product[], sort: SortOption) {
  const list = [...products];
  if (sort === 'priceLowHigh') list.sort((a, b) => a.price - b.price);
  if (sort === 'priceHighLow') list.sort((a, b) => b.price - a.price);
  if (sort === 'nameAZ') list.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'nameZA') list.sort((a, b) => b.name.localeCompare(a.name));
  if (sort === 'newest') list.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
  return list; // 'featured' keeps the catalogue order
}

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
  const [availability, setAvailability] = useState<Availability>('all');
  const [sort, setSort] = useState<SortOption>('featured');

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
    const filtered = products.filter(
      (product) =>
        (text === '' ||
          product.name.toLowerCase().includes(text) ||
          product.style.toLowerCase().includes(text)) &&
        (category === 'all' || product.category === category) &&
        (colour === null || product.colour === colour) &&
        inPriceRange(product.price, priceRange) &&
        (availability === 'all' || (availability === 'inStock' ? product.inStock : !product.inStock)),
    );
    return sortProducts(filtered, sort);
  }, [products, query, category, colour, priceRange, availability, sort]);

  const hasFilters =
    query !== '' || category !== 'all' || colour !== null || priceRange !== 'all' || availability !== 'all';

  function clearFilters() {
    setQuery('');
    setCategory('all');
    setColour(null);
    setPriceRange('all');
    setAvailability('all');
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
    availability,
    setAvailability,
    sort,
    setSort,
    hasFilters,
    clearFilters,
  };
}
