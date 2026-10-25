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
  const { product, quantity, size } = item;

  return (
    <View className="flex-row gap-4 rounded-3xl bg-surface p-3 shadow-sm">
      <ProductImage product={product} size="thumb" />
      <View className="flex-1 justify-between py-0.5">
        <View className="flex-row items-start justify-between gap-2">
          <View className="flex-1">
            <Text className="text-[10px] font-bold uppercase tracking-widest text-gold">
              {product.colour} · {size ? `Size ${size}` : product.style}
            </Text>
            <Text numberOfLines={1} className="font-semibold text-ink">
              {product.name}
            </Text>
          </View>
          <Pressable
            onPress={onRemove}
            accessibilityRole="button"
            accessibilityLabel={`Remove ${product.name} from cart`}
            hitSlop={8}
            className="h-7 w-7 items-center justify-center rounded-full bg-cream active:opacity-70"
          >
            <Ionicons name="close" size={15} color={colors.muted} />
          </Pressable>
        </View>
        <View className="flex-row items-center justify-between pt-2">
          <Text className="font-display text-lg text-ink">{formatPrice(product.price * quantity)}</Text>
          <View className="flex-row items-center rounded-full bg-cream p-1">
            <Pressable
              onPress={onDecrease}
              accessibilityRole="button"
              accessibilityLabel="Decrease quantity"
              className="h-8 w-8 items-center justify-center rounded-full bg-surface active:opacity-70"
            >
              <Ionicons name="remove" size={16} color={colors.ink} />
            </Pressable>
            <Text className="min-w-8 text-center font-bold text-ink">{quantity}</Text>
            <Pressable
              onPress={onIncrease}
              accessibilityRole="button"
              accessibilityLabel="Increase quantity"
              className="h-8 w-8 items-center justify-center rounded-full bg-ink active:opacity-70"
            >
              <Ionicons name="add" size={16} color={colors.goldLight} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
