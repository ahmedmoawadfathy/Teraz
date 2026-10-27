export type Category = 'tie' | 'belt';

export type Occasion = 'wedding' | 'business' | 'formal' | 'interview';

export const OCCASIONS: Occasion[] = ['wedding', 'business', 'formal', 'interview'];

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  colour: string;
  style: string;
  description: string;
  imageUrl: string;
  occasions: Occasion[];
  inStock: boolean;
  compareAtPrice?: number;
  isNew?: boolean;
  sizes?: string[];
  addedAt: string;
};

export type SortOption = 'featured' | 'priceLowHigh' | 'priceHighLow' | 'nameAZ' | 'nameZA' | 'newest';

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceLowHigh', label: 'Price: low to high' },
  { value: 'priceHighLow', label: 'Price: high to low' },
  { value: 'nameAZ', label: 'A – Z' },
  { value: 'nameZA', label: 'Z – A' },
];

export const BELT_SIZES = ['90 cm', '95 cm', '100 cm', '105 cm', '110 cm'];
