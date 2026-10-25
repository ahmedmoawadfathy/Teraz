import { Pressable, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppButton } from '@/components/ui/AppButton';
import type { MainTabScreenProps } from '@/app/navigation/types';
import { useCart } from '@/features/cart/hooks/useCart';
import { useFavourites } from '@/features/favourites/hooks/useFavourites';
import { useOrders } from '@/features/orders/hooks/useOrders';
import { colors } from '@/theme/tokens';
import { useProfile } from '../hooks/useProfile';

export default function ProfileScreen({ navigation }: MainTabScreenProps<'Profile'>) {
  const { user } = useProfile();
  const { orders } = useOrders();
  const { favourites } = useFavourites();
  const { itemCount } = useCart();
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const initials = user.fullName
    .split(' ')
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const stats = [
    { label: 'Orders', value: orders.length },
    { label: 'Saved', value: favourites.length },
    { label: 'In cart', value: itemCount },
  ];

  const details: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }[] = [
    { icon: 'mail-outline', label: 'Email', value: user.email },
    { icon: 'call-outline', label: 'Mobile', value: user.phone },
    { icon: 'location-outline', label: 'Address', value: user.address },
  ];

  const links: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void }[] = [
    { icon: 'receipt-outline', label: 'Order history', onPress: () => navigation.navigate('OrderHistory') },
    { icon: 'heart-outline', label: 'Favourites', onPress: () => navigation.navigate('Favourites') },
    { icon: 'sparkles-outline', label: 'Personal stylist', onPress: () => navigation.navigate('Styling') },
    { icon: 'create-outline', label: 'Edit profile', onPress: () => navigation.navigate('EditProfile') },
  ];

  return (
    <ScrollView className="flex-1 bg-cream" contentContainerClassName="pb-12">
      {isFocused ? <StatusBar style="light" /> : null}
      <LinearGradient
        colors={[colors.ink, colors.navy]}
        style={{ paddingTop: insets.top + 24, paddingHorizontal: 20, paddingBottom: 72, borderBottomLeftRadius: 36, borderBottomRightRadius: 36, alignItems: 'center' }}
      >
        <View className="rounded-full border-2 border-goldLight p-1">
          <View className="h-24 w-24 items-center justify-center rounded-full bg-navy">
            <Text className="font-display text-3xl text-goldLight">{initials}</Text>
          </View>
        </View>
        <Text className="mt-4 font-display text-2xl text-white">{user.fullName}</Text>
        <Text className="mt-1 text-slate-300">Teraz member</Text>
      </LinearGradient>

      <View className="-mt-12 mx-5 flex-row rounded-3xl bg-surface py-5 shadow-lg">
        {stats.map((stat, index) => (
          <View key={stat.label} className={`flex-1 items-center gap-1 ${index > 0 ? 'border-l border-line' : ''}`}>
            <Text className="font-display text-2xl text-ink">{stat.value}</Text>
            <Text className="text-xs font-bold uppercase tracking-widest text-muted">{stat.label}</Text>
          </View>
        ))}
      </View>

      <View className="mt-6 gap-5 px-5">
        <View className="gap-4 rounded-3xl bg-surface p-5">
          {details.map((item) => (
            <View key={item.label} className="flex-row items-center gap-4">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-gold/15">
                <Ionicons name={item.icon} size={18} color={colors.gold} />
              </View>
              <View className="flex-1">
                <Text className="text-xs font-bold uppercase tracking-widest text-muted">{item.label}</Text>
                <Text className="text-ink">{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        <View className="overflow-hidden rounded-3xl bg-surface">
          {links.map((link, index) => (
            <Pressable
              key={link.label}
              onPress={link.onPress}
              accessibilityRole="button"
              className={`flex-row items-center gap-4 px-5 py-4 active:bg-cream ${index > 0 ? 'border-t border-line' : ''}`}
            >
              <View className="h-10 w-10 items-center justify-center rounded-full bg-ink">
                <Ionicons name={link.icon} size={18} color={colors.goldLight} />
              </View>
              <Text className="flex-1 font-semibold text-ink">{link.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.muted} />
            </Pressable>
          ))}
        </View>

        <AppButton label="Log out" variant="danger" icon="log-out-outline" onPress={() => navigation.replace('Login')} />
      </View>
    </ScrollView>
  );
}
