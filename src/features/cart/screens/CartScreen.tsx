import { FlatList, Text, View } from 'react-native';
import { AppButton } from '@/components/ui/AppButton';
import { StateMessage } from '@/components/ui/StateMessage';
import type { MainTabScreenProps } from '@/app/navigation/types';
import { formatPrice } from '@/features/catalogue/api';
import { CartItemRow } from '../components/CartItemRow';
import { useCart } from '../hooks/useCart';

export default function CartScreen({ navigation }: MainTabScreenProps<'Cart'>) {
  const { items, itemCount, total, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <StateMessage
        type="empty"
        icon="bag-handle-outline"
        title="Your cart is empty"
        message="The perfect tie or belt is waiting. Add a piece to get started."
        actionLabel="Explore the collection"
        onAction={() => navigation.navigate('Home')}
      />
    );
  }

  return (
    <View className="flex-1 bg-cream">
      <FlatList
        data={items}
        keyExtractor={(item) => item.lineId}
        contentContainerClassName="gap-3 px-5 pb-6"
        ListHeaderComponent={
          <Text className="pb-1 text-muted">
            {itemCount} {itemCount === 1 ? 'piece' : 'pieces'} in your cart
          </Text>
        }
        renderItem={({ item }) => (
          <CartItemRow
            item={item}
            onIncrease={() => updateQuantity(item.lineId, item.quantity + 1)}
            onDecrease={() => updateQuantity(item.lineId, item.quantity - 1)}
            onRemove={() => removeFromCart(item.lineId)}
          />
        )}
      />

      <View className="gap-4 rounded-t-[32px] bg-surface px-5 pb-5 pt-6 shadow-lg">
        <View className="gap-2">
          <View className="flex-row justify-between">
            <Text className="text-muted">Subtotal</Text>
            <Text className="font-semibold text-ink">{formatPrice(total)}</Text>
          </View>
          <View className="h-px bg-line" />
          <View className="flex-row items-end justify-between">
            <Text className="font-display text-xl text-ink">Total</Text>
            <Text className="font-display text-3xl text-ink">{formatPrice(total)}</Text>
          </View>
        </View>
        <AppButton label="Checkout" icon="lock-closed-outline" onPress={() => navigation.navigate('Checkout')} />
      </View>
    </View>
  );
}
