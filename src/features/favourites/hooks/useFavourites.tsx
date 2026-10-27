import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import type { Product } from '@/features/catalogue/types';

type FavouritesValue = {
  favourites: Product[];
  isFavourite: (productId: string) => boolean;
  toggleFavourite: (product: Product) => void;
  removeFavourite: (productId: string) => void;
};

const FavouritesContext = createContext<FavouritesValue | null>(null);

export function FavouritesProvider({ children }: PropsWithChildren) {
  const [favourites, setFavourites] = useState<Product[]>([]);

  const isFavourite = (productId: string) => favourites.some((item) => item.id === productId);

  const removeFavourite = (productId: string) =>
    setFavourites((current) => current.filter((item) => item.id !== productId));

  const toggleFavourite = (product: Product) =>
    setFavourites((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product],
    );

  return (
    <FavouritesContext.Provider value={{ favourites, isFavourite, toggleFavourite, removeFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const value = useContext(FavouritesContext);
  if (!value) throw new Error('useFavourites must be inside FavouritesProvider');
  return value;
}
