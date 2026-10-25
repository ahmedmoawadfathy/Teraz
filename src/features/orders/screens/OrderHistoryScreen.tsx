import { FlatList, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StateMessage } from '@/components/ui/StateMessage';
import type { RootStackScreenProps } from '@/app/navigation/types';
import { formatPrice } from '@/features/catalogue/api';
import { colors } from '@/theme/tokens';
import { formatOrderDate } from '../api';
import { StatusBadge } from '../components/StatusBadge';
import { useOrders } from '../hooks/useOrders';

export default function OrderHistoryScreen({ navigation }: RootStackScreenProps<'OrderHistory'>) {
  const { orders } = useOrders();

  return (
    <FlatList
      className="flex-1 bg-cream"
      data={orders}
      keyExtractor={(item) => item.id}
      contentContainerClassName="flex-grow gap-3 px-5 pb-10 pt-2"
      ListEmptyComponent={
        <StateMessage
          type="empty"
          icon="receipt-outline"
          title="No orders yet"
          message="Orders you place will appear here."
          actionLabel="Start shopping"
          onAction={() => navigation.navigate('Main', { screen: 'Home' })}
        />
      }
      renderItem={({ item }) => {
        const count = item.items.reduce((sum, line) => sum + line.quantity, 0);
        return (
          <Pressable
            onPress={() => navigation.navigate('OrderDetails', { orderId: item.id })}
            accessibilityRole="button"
            className="gap-4 rounded-3xl bg-surface p-5 shadow-sm active:opacity-80"
          >
            <View className="flex-row items-center gap-3">
              <View className="h-11 w-11 items-center justify-center rounded-full bg-ink">
                <Ionicons name="bag-handle-outline" size={19} color={colors.goldLight} />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-ink">Order {item.id}</Text>
                <Text className="text-sm text-muted">{formatOrderDate(item.orderDate)}</Text>
              </View>
              <StatusBadge status={item.status} />
            </View>
            <View className="h-px bg-line" />
            <View className="flex-row items-center justify-between">
              <Text className="text-muted">
                {count} {count === 1 ? 'piece' : 'pieces'}
              </Text>
              <View className="flex-row items-center gap-2">
                <Text className="font-display text-xl text-ink">{formatPrice(item.totalPrice)}</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.muted} />
              </View>
            </View>
          </Pressable>
        );
      }}
    />
  );
}
