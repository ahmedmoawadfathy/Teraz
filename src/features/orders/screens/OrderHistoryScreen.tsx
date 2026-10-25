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
      contentContainerClassName="flex-grow gap-3 p-4"
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
            className="flex-row items-center gap-3 rounded-2xl bg-surface p-4 active:opacity-70"
          >
            <View className="flex-1 gap-1.5">
              <View className="flex-row items-center justify-between">
                <Text className="font-bold text-ink">{item.id}</Text>
                <StatusBadge status={item.status} />
              </View>
              <Text className="text-muted">
                {formatOrderDate(item.orderDate)} · {count} {count === 1 ? 'item' : 'items'}
              </Text>
              <Text className="font-semibold text-ink">{formatPrice(item.totalPrice)}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </Pressable>
        );
      }}
    />
  );
}
