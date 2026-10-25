import './global.css';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from '@/app/navigation/RootNavigator';
import { CartProvider } from '@/features/cart/hooks/useCart';
import { FavouritesProvider } from '@/features/favourites/hooks/useFavourites';
import { OrdersProvider } from '@/features/orders/hooks/useOrders';
import { ProfileProvider } from '@/features/profile/hooks/useProfile';

// Providers sit above the navigator so every screen shares the same
// profile, favourites, cart and orders.
export default function App() {
  return (
    <ProfileProvider>
      <FavouritesProvider>
        <CartProvider>
          <OrdersProvider>
            <RootNavigator />
            <StatusBar style="dark" />
          </OrdersProvider>
        </CartProvider>
      </FavouritesProvider>
    </ProfileProvider>
  );
}
