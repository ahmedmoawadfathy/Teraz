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
};
