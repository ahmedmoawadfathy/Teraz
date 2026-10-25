import { useState } from 'react';
import type { Occasion } from '@/features/catalogue/types';
import type { StylingRequest } from '../types';

type Errors = Partial<Record<keyof StylingRequest, string>>;

// ViewModel for the outfit form: holds the choices and validates them.
export function useStyling() {
  const [suitColour, setSuitColour] = useState<string | null>(null);
  const [shirtColour, setShirtColour] = useState<string | null>(null);
  const [shoeColour, setShoeColour] = useState<string | null>(null);
  const [occasion, setOccasion] = useState<Occasion | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  // Returns the request when every field is chosen, otherwise shows the errors.
  function submit(): StylingRequest | null {
    const next: Errors = {};
    if (!suitColour) next.suitColour = 'Choose your suit colour.';
    if (!shirtColour) next.shirtColour = 'Choose your shirt colour.';
    if (!shoeColour) next.shoeColour = 'Choose your shoe colour.';
    if (!occasion) next.occasion = 'Choose the occasion.';
    setErrors(next);

    if (!suitColour || !shirtColour || !shoeColour || !occasion) return null;
    return { suitColour, shirtColour, shoeColour, occasion };
  }

  function reset() {
    setSuitColour(null);
    setShirtColour(null);
    setShoeColour(null);
    setOccasion(null);
    setErrors({});
  }

  return {
    suitColour,
    setSuitColour,
    shirtColour,
    setShirtColour,
    shoeColour,
    setShoeColour,
    occasion,
    setOccasion,
    errors,
    submit,
    reset,
  };
}
