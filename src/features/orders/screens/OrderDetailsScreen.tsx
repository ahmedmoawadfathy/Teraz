import { ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AppButton } from '@/components/ui/AppButton';
import { StateMessage } from '@/components/ui/StateMessage';
import type { RootStackScreenProps } from '@/app/navigation/types';
import { formatPrice } from '@/features/catalogue/api';
import { colors } from '@/theme/tokens';
import { formatOrderDate } from '../api';
import { StatusBadge } from '../components/StatusBadge';
import { useOrders } from '../hooks/useOrders';
import type { OrderStatus } from '../types';

const STEPS: { status: OrderStatus; icon: 'receipt-outline' | 'car-outline' | 'home-outline' }[] = [
  { status: 'Processing', icon: 'receipt-outline' },
  { status: 'Shipped', icon: 'car-outline' },
  { status: 'Delivered', icon: 'home-outline' },
];

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

  const currentStep = STEPS.findIndex((step) => step.status === order.status);

  return (
    <ScrollView className="flex-1 bg-cream" contentContainerClassName="gap-4 px-5 pb-12 pt-2">
      {justPlaced ? (
        <LinearGradient colors={[colors.ink, colors.navy]} style={{ borderRadius: 28, padding: 24, alignItems: 'center', gap: 10 }}>
          <View className="h-16 w-16 items-center justify-center rounded-full bg-goldLight">
            <Ionicons name="checkmark" size={34} color={colors.ink} />
          </View>
          <Text className="font-display text-2xl text-white">Order placed</Text>
          <Text className="text-center text-slate-300">Thank you! Your pieces are being prepared. We'll let you know when they ship.</Text>
        </LinearGradient>
      ) : null}

      <View className="gap-5 rounded-[28px] bg-surface p-5 shadow-sm">
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="font-display text-2xl text-ink">{order.id}</Text>
            <Text className="text-muted">Placed on {formatOrderDate(order.orderDate)}</Text>
          </View>
          <StatusBadge status={order.status} />
        </View>

        <View className="flex-row items-start">
          {STEPS.map((step, index) => {
            const reached = index <= currentStep;
            return (
              <View key={step.status} className="flex-1 items-center gap-2">
                <View className="w-full flex-row items-center">
                  <View className={`h-0.5 flex-1 ${index === 0 ? 'bg-transparent' : reached ? 'bg-gold' : 'bg-line'}`} />
                  <View className={`h-10 w-10 items-center justify-center rounded-full ${reached ? 'bg-ink' : 'bg-cream'}`}>
                    <Ionicons name={step.icon} size={17} color={reached ? colors.goldLight : colors.muted} />
                  </View>
                  <View
                    className={`h-0.5 flex-1 ${index === STEPS.length - 1 ? 'bg-transparent' : index < currentStep ? 'bg-gold' : 'bg-line'}`}
                  />
                </View>
                <Text className={`text-xs ${reached ? 'font-bold text-ink' : 'text-muted'}`}>{step.status}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View className="gap-4 rounded-[28px] bg-surface p-5 shadow-sm">
        <Text className="font-display text-xl text-ink">Items</Text>
        {order.items.map((line) => (
          <View key={`${line.productId}-${line.size ?? ''}`} className="flex-row items-center justify-between gap-3">
            <View className="flex-1">
              <Text className="font-semibold text-ink">{line.name}</Text>
              <Text className="text-sm text-muted">
                {line.quantity} × {formatPrice(line.unitPrice)}
                {line.size ? ` · Size ${line.size}` : ''}
              </Text>
            </View>
            <Text className="font-semibold text-ink">{formatPrice(line.quantity * line.unitPrice)}</Text>
          </View>
        ))}
        <View className="h-px bg-line" />
        <View className="flex-row items-end justify-between">
          <Text className="font-display text-xl text-ink">Total</Text>
          <Text className="font-display text-3xl text-ink">{formatPrice(order.totalPrice)}</Text>
        </View>
      </View>

      <View className="flex-row gap-4 rounded-[28px] bg-surface p-5 shadow-sm">
        <View className="h-10 w-10 items-center justify-center rounded-full bg-gold/15">
          <Ionicons name="location-outline" size={18} color={colors.gold} />
        </View>
        <View className="flex-1 gap-0.5">
          <Text className="text-xs font-bold uppercase tracking-widest text-muted">Delivering to</Text>
          <Text className="text-ink">{order.deliveryAddress}</Text>
          <Text className="text-muted">{order.phone}</Text>
        </View>
      </View>

      {justPlaced ? (
        <AppButton label="Continue shopping" icon="arrow-forward" onPress={() => navigation.navigate('Main', { screen: 'Home' })} />
      ) : null}
    </ScrollView>
  );
}
