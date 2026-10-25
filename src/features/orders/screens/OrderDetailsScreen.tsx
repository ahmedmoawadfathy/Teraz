import { ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppButton } from '@/components/ui/AppButton';
import { StateMessage } from '@/components/ui/StateMessage';
import type { RootStackScreenProps } from '@/app/navigation/types';
import { formatPrice } from '@/features/catalogue/api';
import { colors } from '@/theme/tokens';
import { formatOrderDate } from '../api';
import { StatusBadge } from '../components/StatusBadge';
import { useOrders } from '../hooks/useOrders';

export default function OrderDetailsScreen({ navigation, route }: RootStackScreenProps<'OrderDetails'>) {
  const { orderId, justPlaced } = route.params;
  const { getOrder } = useOrders();
  const order = getOrder(orderId);

  if (!order) {
    return (
      <StateMessage
        type="error"
        title="Order not found"
        message={`We could not find order ${orderId}.`}
        actionLabel="Go back"
        onAction={() => navigation.goBack()}
      />
    );
  }

  return (
    <ScrollView className="flex-1 bg-cream" contentContainerClassName="gap-4 p-4 pb-10">
      {justPlaced ? (
        <View className="items-center gap-2 rounded-2xl bg-emerald-50 p-5">
          <Ionicons name="checkmark-circle" size={44} color={colors.success} />
          <Text className="text-xl font-bold text-ink">Order placed</Text>
          <Text className="text-center text-muted">Thank you! We'll let you know when it ships.</Text>
        </View>
      ) : null}

      <View className="gap-2 rounded-2xl bg-surface p-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold text-ink">{order.id}</Text>
          <StatusBadge status={order.status} />
        </View>
        <Text className="text-muted">Placed on {formatOrderDate(order.orderDate)}</Text>
      </View>

      <View className="gap-3 rounded-2xl bg-surface p-4">
        <Text className="font-bold text-ink">Items</Text>
        {order.items.map((line) => (
          <View key={line.productId} className="flex-row justify-between gap-3">
            <View className="flex-1">
              <Text className="text-ink">{line.name}</Text>
              <Text className="text-sm text-muted">
                {line.quantity} × {formatPrice(line.unitPrice)}
              </Text>
            </View>
            <Text className="font-semibold text-ink">{formatPrice(line.quantity * line.unitPrice)}</Text>
          </View>
        ))}
        <View className="flex-row justify-between border-t border-line pt-3">
          <Text className="text-lg font-bold text-ink">Total</Text>
          <Text className="text-lg font-bold text-ink">{formatPrice(order.totalPrice)}</Text>
        </View>
      </View>

      <View className="gap-1 rounded-2xl bg-surface p-4">
        <Text className="font-bold text-ink">Delivery</Text>
        <Text className="text-ink">{order.deliveryAddress}</Text>
        <Text className="text-muted">{order.phone}</Text>
      </View>

      {justPlaced ? (
        <AppButton label="Continue shopping" onPress={() => navigation.navigate('Main', { screen: 'Home' })} />
      ) : null}
    </ScrollView>
  );
}
