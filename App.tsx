import './global.css';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  PlayfairDisplay_400Regular,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import { RootNavigator } from '@/app/navigation/RootNavigator';
import { CartProvider } from '@/features/cart/hooks/useCart';
import { FavouritesProvider } from '@/features/favourites/hooks/useFavourites';
import { OrdersProvider } from '@/features/orders/hooks/useOrders';
import { ProfileProvider } from '@/features/profile/hooks/useProfile';

// Providers sit above the navigator so every screen shares the same
// profile, favourites, cart and orders.
export default function App() {
  // The brand serif font is loaded once before the first screen is drawn.
  const [fontsLoaded] = useFonts({ PlayfairDisplay_400Regular, PlayfairDisplay_600SemiBold, PlayfairDisplay_700Bold });
  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}
