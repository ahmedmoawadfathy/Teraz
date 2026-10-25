import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/tokens';
import { useCart } from '@/features/cart/hooks/useCart';
import LoginScreen from '@/features/auth/screens/LoginScreen';
import RegisterScreen from '@/features/auth/screens/RegisterScreen';
import CatalogueScreen from '@/features/catalogue/screens/CatalogueScreen';
import SearchScreen from '@/features/catalogue/screens/SearchScreen';
import ProductDetailsScreen from '@/features/catalogue/screens/ProductDetailsScreen';
import StylingInputScreen from '@/features/styling/screens/StylingInputScreen';
import StylingResultsScreen from '@/features/styling/screens/StylingResultsScreen';
import FavouritesScreen from '@/features/favourites/screens/FavouritesScreen';
import CartScreen from '@/features/cart/screens/CartScreen';
import CheckoutScreen from '@/features/cart/screens/CheckoutScreen';
import ProfileScreen from '@/features/profile/screens/ProfileScreen';
import EditProfileScreen from '@/features/profile/screens/EditProfileScreen';
import OrderHistoryScreen from '@/features/orders/screens/OrderHistoryScreen';
import OrderDetailsScreen from '@/features/orders/screens/OrderDetailsScreen';
import type { MainTabParamList, RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONS = {
  Home: 'shirt-outline',
  Styling: 'color-palette-outline',
  Favourites: 'heart-outline',
  Cart: 'bag-outline',
  Profile: 'person-outline',
} as const;

const headerOptions = {
  headerStyle: { backgroundColor: colors.cream },
  headerTintColor: colors.ink,
  headerShadowVisible: false,
  headerTitleStyle: { fontWeight: '700' as const },
};

// Tabs for the main areas the customer switches between.
function MainTabs() {
  const { itemCount } = useCart();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...headerOptions,
        tabBarActiveTintColor: colors.ink,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.line },
        tabBarIcon: ({ color, size }) => <Ionicons name={ICONS[route.name]} color={color} size={size} />,
      })}
    >
      <Tab.Screen name="Home" component={CatalogueScreen} options={{ title: 'Shop', headerTitle: 'TERAZ' }} />
      <Tab.Screen name="Styling" component={StylingInputScreen} options={{ title: 'Style me', headerTitle: 'Personal styling' }} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarBadge: itemCount > 0 ? itemCount : undefined,
          tabBarBadgeStyle: { backgroundColor: colors.gold },
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Stack(Login, Register, Main tabs, detail screens): tabs live inside one stack screen.
export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={headerOptions}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Create account' }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: '' }} />
        <Stack.Screen name="StylingResults" component={StylingResultsScreen} options={{ title: 'Your matches' }} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit profile' }} />
        <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ title: 'Order history' }} />
        <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{ title: 'Order details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
