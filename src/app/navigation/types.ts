import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { StylingRequest } from '@/features/styling/types';

export type MainTabParamList = {
  Home: undefined;
  Styling: undefined;
  Favourites: undefined;
  Cart: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Login: { email?: string; justRegistered?: boolean } | undefined;
  Register: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
  Search: undefined;
  ProductDetails: { productId: string };
  StylingResults: StylingRequest;
  Checkout: undefined;
  EditProfile: undefined;
  OrderHistory: undefined;
  OrderDetails: { orderId: string; justPlaced?: boolean };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;
