import { Text, View } from 'react-native';
import type { OrderStatus } from '../types';

const badgeClass: Record<OrderStatus, string> = {
  Processing: 'bg-amber-100',
  Shipped: 'bg-sky-100',
  Delivered: 'bg-emerald-100',
};

const textClass: Record<OrderStatus, string> = {
  Processing: 'text-amber-800',
  Shipped: 'text-sky-800',
  Delivered: 'text-emerald-800',
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <View className={`self-start rounded-full px-3 py-1 ${badgeClass[status]}`}>
      <Text className={`text-xs font-bold ${textClass[status]}`}>{status}</Text>
    </View>
  );
}
