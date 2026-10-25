import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatPrice } from '@/features/catalogue/api';
import { ProductImage } from '@/features/catalogue/components/ProductImage';
import { colors } from '@/theme/tokens';
import type { CartItem } from '../types';

type Props = {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export function CartItemRow({ item, onIncrease, onDecrease, onRemove }: Props) {
  const { product, quantity } = item;

  return (
    <View className="flex-row gap-3 rounded-2xl bg-surface p-3">
      <ProductImage product={product} size="thumb" />
      <View className="flex-1 gap-2">
        <View className="flex-row items-start justify-between gap-2">
          <Text className="flex-1 font-semibold text-ink">{product.name}</Text>
          <Pressable
            onPress={onRemove}
            accessibilityRole="button"
            accessibilityLabel={`Remove ${product.name} from cart`}
            hitSlop={8}
            className="active:opacity-70"
          >
            <Ionicons name="close" size={20} color={colors.muted} />
          </Pressable>
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3 rounded-full border border-line px-2 py-1">
            <Pressable onPress={onDecrease} accessibilityRole="button" accessibilityLabel="Decrease quantity" hitSlop={6} className="active:opacity-70">
              <Ionicons name="remove" size={18} color={colors.ink} />
            </Pressable>
            <Text className="min-w-5 text-center font-semibold text-ink">{quantity}</Text>
            <Pressable onPress={onIncrease} accessibilityRole="button" accessibilityLabel="Increase quantity" hitSlop={6} className="active:opacity-70">
              <Ionicons name="add" size={18} color={colors.ink} />
            </Pressable>
          </View>
          <Text className="font-bold text-ink">{formatPrice(product.price * quantity)}</Text>
        </View>
      </View>
    </View>
  );
}
