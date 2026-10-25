import type { Product } from '@/features/catalogue/types';
import type { StylingRequest, StylingRule } from './types';

export const SUIT_COLOURS = ['Navy', 'Charcoal', 'Grey', 'Black'];
export const SHIRT_COLOURS = ['White', 'Light Blue', 'Pink', 'Black'];
export const SHOE_COLOURS = ['Black', 'Brown', 'Tan'];

// Tie colours that work with each suit for each occasion.
export const STYLING_RULES: StylingRule[] = [
  { id: 'r1', suitColour: 'Navy', shirtColour: 'Any', occasion: 'wedding', matchingColours: ['Silver', 'Burgundy', 'Gold', 'Green'] },
  { id: 'r2', suitColour: 'Navy', shirtColour: 'Any', occasion: 'business', matchingColours: ['Burgundy', 'Light Blue', 'Black'] },
  { id: 'r3', suitColour: 'Navy', shirtColour: 'Any', occasion: 'formal', matchingColours: ['Silver', 'Burgundy', 'Gold'] },
  { id: 'r4', suitColour: 'Navy', shirtColour: 'Any', occasion: 'interview', matchingColours: ['Burgundy', 'Black', 'Light Blue'] },
  { id: 'r5', suitColour: 'Charcoal', shirtColour: 'Any', occasion: 'wedding', matchingColours: ['Silver', 'Burgundy', 'Gold'] },
  { id: 'r6', suitColour: 'Charcoal', shirtColour: 'Any', occasion: 'business', matchingColours: ['Burgundy', 'Navy', 'Light Blue'] },
  { id: 'r7', suitColour: 'Charcoal', shirtColour: 'Any', occasion: 'formal', matchingColours: ['Silver', 'Black', 'Burgundy'] },
  { id: 'r8', suitColour: 'Charcoal', shirtColour: 'Any', occasion: 'interview', matchingColours: ['Navy', 'Burgundy'] },
  { id: 'r9', suitColour: 'Grey', shirtColour: 'Any', occasion: 'wedding', matchingColours: ['Burgundy', 'Navy', 'Green'] },
  { id: 'r10', suitColour: 'Grey', shirtColour: 'Any', occasion: 'business', matchingColours: ['Navy', 'Burgundy', 'Black'] },
  { id: 'r11', suitColour: 'Grey', shirtColour: 'Any', occasion: 'formal', matchingColours: ['Navy', 'Black', 'Silver'] },
  { id: 'r12', suitColour: 'Grey', shirtColour: 'Any', occasion: 'interview', matchingColours: ['Navy', 'Burgundy'] },
  { id: 'r13', suitColour: 'Black', shirtColour: 'Any', occasion: 'wedding', matchingColours: ['Silver', 'Gold', 'Burgundy'] },
  { id: 'r14', suitColour: 'Black', shirtColour: 'Any', occasion: 'business', matchingColours: ['Silver', 'Burgundy'] },
  { id: 'r15', suitColour: 'Black', shirtColour: 'Any', occasion: 'formal', matchingColours: ['Black', 'Silver', 'Gold'] },
  { id: 'r16', suitColour: 'Black', shirtColour: 'Any', occasion: 'interview', matchingColours: ['Black', 'Navy'] },
  // A black shirt under a black suit only works with a light tie.
  { id: 'r17', suitColour: 'Black', shirtColour: 'Black', occasion: 'formal', matchingColours: ['Silver', 'Gold'] },
];

function findRule(request: StylingRequest, rules: StylingRule[]) {
  const sameSuitAndOccasion = rules.filter(
    (rule) => rule.suitColour === request.suitColour && rule.occasion === request.occasion,
  );
  // A rule written for this exact shirt colour wins over a general 'Any' rule.
  return (
    sameSuitAndOccasion.find((rule) => rule.shirtColour === request.shirtColour) ??
    sameSuitAndOccasion.find((rule) => rule.shirtColour === 'Any')
  );
}

// Rule-based recommendation: ties follow the suit/occasion rule and must not
// match the shirt colour; belts must match the shoe colour.
export function getRecommendations(
  request: StylingRequest,
  products: Product[],
  rules: StylingRule[] = STYLING_RULES,
) {
  const rule = findRule(request, rules);
  const available = products.filter(
    (product) => product.inStock && product.occasions.includes(request.occasion),
  );

  const ties = rule
    ? available.filter(
        (product) =>
          product.category === 'tie' &&
          rule.matchingColours.includes(product.colour) &&
          product.colour !== request.shirtColour,
      )
    : [];

  const belts = available.filter(
    (product) => product.category === 'belt' && product.colour === request.shoeColour,
  );

  return { ties, belts };
}
