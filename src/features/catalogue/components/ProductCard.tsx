import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '@/features/cart/hooks/useCart';
import { colors } from '@/theme/tokens';
import { discountPercent, formatPrice } from '../api';
import type { Product } from '../types';
import { ProductImage } from './ProductImage';

type Props = {
  product: Product;
  onPress: () => void;
  isFavourite: boolean;
  onToggleFavourite: () => void;
  width?: number;
};

export function ProductCard({ product, onPress, isFavourite, onToggleFavourite, width }: Props) {
  const { addToCart, isInCart } = useCart();
  const discount = discountPercent(product);
  const inCart = isInCart(product.id);
  const needsSize = Boolean(product.sizes);

  function handleQuickAdd() {
    if (needsSize) onPress();
    else addToCart(product);
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${product.name}, ${formatPrice(product.price)}`}
      className={`gap-3 rounded-3xl bg-surface p-2.5 shadow-sm active:opacity-80 ${width ? '' : 'flex-1'}`}
      style={width ? { width } : undefined}
    >
      <View>
        <ProductImage product={product} />
        <Pressable
          onPress={onToggleFavourite}
          accessibilityRole="button"
          accessibilityLabel={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          hitSlop={8}
          className="absolute right-2.5 top-2.5 h-9 w-9 items-center justify-center rounded-full bg-surface/95 active:opacity-70"
        >
          <Ionicons name={isFavourite ? 'heart' : 'heart-outline'} size={18} color={isFavourite ? colors.danger : colors.ink} />
        </Pressable>

        <View className="absolute left-2.5 top-2.5 gap-1.5">
          {!product.inStock ? (
            <View className="rounded-full bg-ink/85 px-2.5 py-1">
              <Text className="text-[10px] font-bold uppercase tracking-widest text-white">Sold out</Text>
            </View>
          ) : discount > 0 ? (
            <View className="rounded-full bg-danger px-2.5 py-1">
              <Text className="text-[10px] font-bold uppercase tracking-widest text-white">Sale −{discount}%</Text>
            </View>
          ) : product.isNew ? (
            <View className="rounded-full bg-goldLight px-2.5 py-1">
              <Text className="text-[10px] font-bold uppercase tracking-widest text-ink">New</Text>
            </View>
          ) : null}
        </View>
      </View>

      <View className="gap-1 px-1.5">
        <Text className="text-[10px] font-bold uppercase tracking-widest text-gold">
          {product.style} {product.category}
        </Text>
        <Text numberOfLines={1} className="font-semibold text-ink">
          {product.name}
        </Text>
        <View className="flex-row items-baseline gap-2">
          <Text className={`font-display text-lg ${discount > 0 ? 'text-danger' : 'text-ink'}`}>{formatPrice(product.price)}</Text>
          {discount > 0 && product.compareAtPrice ? (
            <Text className="text-xs text-muted line-through">{formatPrice(product.compareAtPrice)}</Text>
          ) : null}
        </View>
      </View>

      {product.inStock ? (
        <Pressable
          onPress={handleQuickAdd}
          accessibilityRole="button"
          accessibilityLabel={needsSize ? `Choose a size for ${product.name}` : inCart ? `${product.name} added` : `Add ${product.name} to cart`}
          className={`flex-row items-center justify-center gap-1.5 rounded-full py-2.5 active:opacity-80 ${
            inCart && !needsSize ? 'bg-sand' : 'bg-ink'
          }`}
        >
          <Ionicons
            name={needsSize ? 'resize-outline' : inCart ? 'checkmark' : 'add'}
            size={15}
            color={inCart && !needsSize ? colors.ink : colors.goldLight}
          />
          <Text className={`text-sm font-bold ${inCart && !needsSize ? 'text-ink' : 'text-goldLight'}`}>
            {needsSize ? 'Choose size' : inCart ? 'Added' : 'Add'}
          </Text>
        </Pressable>
      ) : (
        <View className="items-center rounded-full bg-cream py-2.5">
          <Text className="text-sm font-semibold text-muted">Sold out</Text>
        </View>
      )}
    </Pressable>
  );
}
