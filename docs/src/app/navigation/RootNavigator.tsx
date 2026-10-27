import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '@/theme/tokens';
import { useCart } from '@/features/cart/hooks/useCart';
import LoginScreen from '@/features/auth/screens/LoginScreen';
import RegisterScreen from '@/features/auth/screens/RegisterScreen';
import CatalogueScreen from '@/features/catalogue/screens/CatalogueScreen';
import ProductDetailsScreen from '@/features/catalogue/screens/ProductDetailsScreen';
import FavouritesScreen from '@/features/favourites/screens/FavouritesScreen';
import ProfileScreen from '@/features/profile/screens/ProfileScreen';
import OrderHistoryScreen from '@/features/orders/screens/OrderHistoryScreen';
import OrderDetailsScreen from '@/features/orders/screens/OrderDetailsScreen';
import type { MainTabParamList, RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONS = {
  Home: ['home-outline', 'home'],
  Styling: ['sparkles-outline', 'sparkles'],
  Favourites: ['heart-outline', 'heart'],
  Cart: ['bag-handle-outline', 'bag-handle'],
  Profile: ['person-outline', 'person'],
} as const;

const navTheme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: colors.cream } };

const headerOptions = {
  headerStyle: { backgroundColor: colors.cream },
  headerTintColor: colors.ink,
  headerShadowVisible: false,
  headerTitleStyle: { fontFamily: fonts.display, fontSize: 20 },
  headerBackButtonDisplayMode: 'minimal' as const,
};

function MainTabs() {
  const { itemCount } = useCart();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...headerOptions,
        tabBarActiveTintColor: colors.goldLight,
        tabBarInactiveTintColor: '#8B93A7',
        tabBarStyle: {
          backgroundColor: colors.ink,
          borderTopWidth: 0,
          height: 68,
          paddingTop: 8,
          paddingBottom: 10,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={ICONS[route.name][focused ? 1 : 0]} color={color} size={size} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={CatalogueScreen} options={{ title: 'Shop', headerShown: false }} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} options={{ title: 'Saved', headerTitle: 'Your favourites' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Login" screenOptions={headerOptions}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: '' }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ title: 'Your orders' }} />
        <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{ title: 'Order details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
