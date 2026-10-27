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
  shirtColour: string;
  occasion: Occasion;
  matchingColours: string[];
};
