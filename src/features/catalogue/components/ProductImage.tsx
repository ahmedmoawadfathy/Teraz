import { Image, Text, View } from 'react-native';
import { colourHex } from '../colours';
import type { Product } from '../types';

type Props = {
  product: Product;
  size?: 'card' | 'large' | 'thumb';
};

const heightClass = { card: 'h-36', large: 'h-72', thumb: 'h-16 w-16' } as const;

// Shows the product photo, or a colour swatch until the real photos are added.
export function ProductImage({ product, size = 'card' }: Props) {
  if (product.imageUrl) {
    return (
      <Image
        source={{ uri: product.imageUrl }}
        accessibilityLabel={product.name}
        className={`w-full rounded-xl ${heightClass[size]}`}
      />
    );
  }

  const isLight = ['White', 'Silver', 'Light Blue', 'Pink', 'Tan', 'Gold'].includes(product.colour);

  return (
    <View
      accessibilityLabel={product.name}
      className={`items-center justify-center rounded-xl ${size === 'thumb' ? '' : 'w-full'} ${heightClass[size]}`}
      style={{ backgroundColor: colourHex(product.colour) }}
    >
      <Text className={`text-xs font-bold uppercase tracking-widest ${isLight ? 'text-ink' : 'text-white'}`}>
        {size === 'thumb' ? product.category : `${product.colour} ${product.category}`}
      </Text>
    </View>
  );
}
