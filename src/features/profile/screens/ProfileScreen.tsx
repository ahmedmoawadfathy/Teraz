import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppButton } from '@/components/ui/AppButton';
import type { MainTabScreenProps } from '@/app/navigation/types';
import { useFavourites } from '@/features/favourites/hooks/useFavourites';
import { useOrders } from '@/features/orders/hooks/useOrders';
import { colors } from '@/theme/tokens';
import { useProfile } from '../hooks/useProfile';

export default function ProfileScreen({ navigation }: MainTabScreenProps<'Profile'>) {
  const { user } = useProfile();
  const { orders } = useOrders();
  const { favourites } = useFavourites();

  const initials = user.fullName
    .split(' ')
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const details: { icon: keyof typeof Ionicons.glyphMap; value: string }[] = [
    { icon: 'mail-outline', value: user.email },
    { icon: 'call-outline', value: user.phone },
    { icon: 'location-outline', value: user.address },
  ];

  const links: { icon: keyof typeof Ionicons.glyphMap; label: string; detail: string; onPress: () => void }[] = [
    { icon: 'receipt-outline', label: 'Order history', detail: `${orders.length}`, onPress: () => navigation.navigate('OrderHistory') },
    { icon: 'heart-outline', label: 'Favourites', detail: `${favourites.length}`, onPress: () => navigation.navigate('Favourites') },
    { icon: 'create-outline', label: 'Edit profile', detail: '', onPress: () => navigation.navigate('EditProfile') },
  ];

  return (
    <ScrollView className="flex-1 bg-cream" contentContainerClassName="gap-5 p-4 pb-10">
      <View className="items-center gap-2 rounded-2xl bg-surface p-6">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-ink">
          <Text className="text-2xl font-bold text-gold">{initials}</Text>
        </View>
        <Text className="text-xl font-bold text-ink">{user.fullName}</Text>
        <View className="w-full gap-2 pt-2">
          {details.map((item) => (
            <View key={item.icon} className="flex-row items-center gap-3">
              <Ionicons name={item.icon} size={18} color={colors.muted} />
              <Text className="flex-1 text-ink">{item.value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="overflow-hidden rounded-2xl bg-surface">
        {links.map((link, index) => (
          <Pressable
            key={link.label}
            onPress={link.onPress}
            accessibilityRole="button"
            className={`flex-row items-center gap-3 px-4 py-4 active:bg-cream ${index > 0 ? 'border-t border-line' : ''}`}
          >
            <Ionicons name={link.icon} size={20} color={colors.ink} />
            <Text className="flex-1 font-medium text-ink">{link.label}</Text>
            {link.detail ? <Text className="text-muted">{link.detail}</Text> : null}
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </Pressable>
        ))}
      </View>

      <AppButton label="Log out" variant="danger" onPress={() => navigation.replace('Login')} />
    </ScrollView>
  );
}
