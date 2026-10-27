import { Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/theme/tokens';
import { colourHex } from '../colours';
import type { Product } from '../types';

type Props = {
  product: Product;
  size?: 'card' | 'large' | 'thumb';
};

const boxSize = {
  card: { width: '100%', height: 176 },
  large: { width: '100%', height: 360 },
  thumb: { width: 76, height: 76 },
} as const;

const LIGHT_COLOURS = ['White', 'Silver', 'Light Blue', 'Pink', 'Tan', 'Gold'];

function shade(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const channel = (shift: number) => Math.round(((n >> shift) & 255) * (1 - amount));
  return `rgb(${channel(16)}, ${channel(8)}, ${channel(0)})`;
}

export function ProductImage({ product, size = 'card' }: Props) {
  const radius = size === 'thumb' ? 16 : 20;

  if (product.imageUrl) {
    return (
      <Image
        source={{ uri: product.imageUrl }}
        accessibilityLabel={product.name}
        resizeMode="cover"
        style={[boxSize[size], { borderRadius: radius, backgroundColor: colors.sand }]}
      />
    );
  }

  const base = colourHex(product.colour);
  const isLight = LIGHT_COLOURS.includes(product.colour);
  const fill = isLight ? 'rgba(14,20,36,0.16)' : 'rgba(255,255,255,0.16)';
  const scale = size === 'large' ? 1.9 : size === 'thumb' ? 0.42 : 1;

  return (
    <View accessibilityLabel={product.name} style={[boxSize[size], { borderRadius: radius, overflow: 'hidden' }]}>
      <LinearGradient
        colors={[base, shade(base, isLight ? 0.18 : 0.45)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <View
          style={{
            position: 'absolute',
            width: '160%',
            height: 46 * scale,
            backgroundColor: 'rgba(255,255,255,0.06)',
            transform: [{ rotate: '-28deg' }],
          }}
        />

        {product.category === 'tie' ? (
          <View style={{ alignItems: 'center', transform: [{ scale }] }}>
            <View style={{ width: 18, height: 14, borderRadius: 3, backgroundColor: fill }} />
            <View style={{ width: 26, height: 66, marginTop: 2, backgroundColor: fill }} />
            <View
              style={{
                width: 0,
                height: 0,
                borderLeftWidth: 13,
                borderRightWidth: 13,
                borderTopWidth: 14,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderTopColor: fill,
              }}
            />
          </View>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center', transform: [{ scale }] }}>
            <View style={{ width: 54, height: 18, borderRadius: 4, backgroundColor: fill }} />
            <View
              style={{
                width: 24,
                height: 30,
                borderRadius: 5,
                borderWidth: 3,
                borderColor: colors.goldLight,
                marginHorizontal: -2,
              }}
            />
            <View style={{ width: 54, height: 18, borderRadius: 4, backgroundColor: fill }} />
          </View>
        )}

        {size !== 'thumb' ? (
          <Image
            source={require('../../../../assets/teraz-mark.png')}
            resizeMode="contain"
            style={{ position: 'absolute', right: 12, bottom: 12, width: 22, height: 22, opacity: 0.85 }}
          />
        ) : null}
      </LinearGradient>
    </View>
  );
}
