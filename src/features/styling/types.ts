import type { Occasion } from '@/features/catalogue/types';

export type StylingRequest = {
  suitColour: string;
  shirtColour: string;
  shoeColour: string;
  occasion: Occasion;
};

export type StylingRule = {
  id: string;
  suitColour: string;
  shirtColour: string; // 'Any' matches every shirt colour
  occasion: Occasion;
  matchingColours: string[];
};
