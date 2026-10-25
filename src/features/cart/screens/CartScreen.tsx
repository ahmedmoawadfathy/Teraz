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
      <View className="flex-1 bg-cream">
        <StateMessage
          type="empty"
          icon="bag-outline"
          title="Your cart is empty"
          message="Add a tie or a belt to get started."
          actionLabel="Browse the collection"
          onAction={() => navigation.navigate('Home')}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-cream">
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        contentContainerClassName="gap-3 p-4"
        renderItem={({ item }) => (
          <CartItemRow
            item={item}
            onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
            onDecrease={() => updateQuantity(item.product.id, item.quantity - 1)}
            onRemove={() => removeFromCart(item.product.id)}
          />
        )}
      />

      <View className="gap-3 border-t border-line bg-surface p-4">
        <View className="flex-row justify-between">
          <Text className="text-muted">
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </Text>
          <Text className="font-semibold text-ink">{formatPrice(total)}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-lg font-bold text-ink">Total</Text>
          <Text className="text-lg font-bold text-ink">{formatPrice(total)}</Text>
        </View>
        <AppButton label="Checkout" onPress={() => navigation.navigate('Checkout')} />
      </View>
    </View>
  );
}
