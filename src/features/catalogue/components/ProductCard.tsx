import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/tokens';
import { formatPrice } from '../api';
import type { Product } from '../types';
import { ProductImage } from './ProductImage';

type Props = {
  product: Product;
  onPress: () => void;
  isFavourite: boolean;
  onToggleFavourite: () => void;
};

export function ProductCard({ product, onPress, isFavourite, onToggleFavourite }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${product.name}, ${formatPrice(product.price)}`}
      className="flex-1 gap-2 rounded-2xl bg-surface p-3 active:opacity-70"
    >
      <View>
        <ProductImage product={product} />
        <Pressable
          onPress={onToggleFavourite}
          accessibilityRole="button"
          accessibilityLabel={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          hitSlop={8}
          className="absolute right-2 top-2 rounded-full bg-surface p-1.5 active:opacity-70"
        >
          <Ionicons name={isFavourite ? 'heart' : 'heart-outline'} size={18} color={colors.gold} />
        </Pressable>
      </View>
      <Text numberOfLines={2} className="font-semibold text-ink">
        {product.name}
      </Text>
      <View className="flex-row items-center justify-between">
        <Text className="font-bold text-ink">{formatPrice(product.price)}</Text>
        {!product.inStock ? <Text className="text-xs font-semibold text-danger">Sold out</Text> : null}
      </View>
    </Pressable>
  );
}
