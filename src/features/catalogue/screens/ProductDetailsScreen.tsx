import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Accordion } from '@/components/ui/Accordion';
import { AppButton } from '@/components/ui/AppButton';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StateMessage } from '@/components/ui/StateMessage';
import type { RootStackScreenProps } from '@/app/navigation/types';
import { useFavourites } from '@/features/favourites/hooks/useFavourites';
import { colors } from '@/theme/tokens';
import { discountPercent, formatPrice } from '../api';
import { colourHex } from '../colours';
import { ProductCard } from '../components/ProductCard';
import { ProductImage } from '../components/ProductImage';
import { useProductDetails } from '../hooks/useProductDetails';

const OCCASION_ICONS = {
  wedding: 'heart-outline',
  business: 'briefcase-outline',
  formal: 'wine-outline',
  interview: 'chatbubbles-outline',
} as const;

// Belt size → the waist it fits (general guide).
const SIZE_GUIDE = [
  { size: '90 cm', waist: '70 – 75 cm' },
  { size: '95 cm', waist: '75 – 80 cm' },
  { size: '100 cm', waist: '80 – 85 cm' },
  { size: '105 cm', waist: '85 – 90 cm' },
  { size: '110 cm', waist: '90 – 95 cm' },
];

const CARE = {
  tie: [
    'Untie fully after wearing and hang or roll it to let creases relax.',
    'Dab stains gently with a damp cloth; dry clean only.',
    'Store away from direct sunlight to keep the colour rich.',
  ],
  belt: [
    'Wipe with a soft dry cloth after wearing.',
    'Condition the leather every few months to keep it supple.',
    'Store hanging or loosely rolled, never folded.',
  ],
};

export default function ProductDetailsScreen({ navigation, route }: RootStackScreenProps<'ProductDetails'>) {
  const vm = useProductDetails(route.params.productId);
  const { isFavourite, toggleFavourite } = useFavourites();
  const insets = useSafeAreaInsets();
  const { product } = vm;

  if (vm.loading) return <StateMessage type="loading" />;
  if (vm.error || !product) {
    return (
      <StateMessage
        type="error"
        title="Product not found"
        message={vm.error ?? 'This product is no longer available.'}
        actionLabel="Go back"
        onAction={() => navigation.goBack()}
      />
    );
  }

  const saved = isFavourite(product.id);
  const discount = discountPercent(product);

  return (
    <View className="flex-1 bg-cream">
      <ScrollView contentContainerStyle={{ paddingBottom: 140 + insets.bottom }}>
        <View>
          <ProductImage product={product} size="large" />
          {/* floating controls over the image */}
          <View className="absolute left-0 right-0 flex-row justify-between px-5" style={{ top: insets.top + 10 }}>
            <Pressable
              onPress={() => navigation.goBack()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              className="h-11 w-11 items-center justify-center rounded-full bg-surface/95 active:opacity-70"
            >
              <Ionicons name="chevron-back" size={22} color={colors.ink} />
            </Pressable>
            <Pressable
              onPress={() => toggleFavourite(product)}
              accessibilityRole="button"
              accessibilityLabel={saved ? 'Remove from favourites' : 'Save to favourites'}
              className="h-11 w-11 items-center justify-center rounded-full bg-surface/95 active:opacity-70"
            >
              <Ionicons name={saved ? 'heart' : 'heart-outline'} size={21} color={saved ? colors.danger : colors.ink} />
            </Pressable>
          </View>
        </View>

        <View className="-mt-8 gap-6 rounded-t-[32px] bg-cream px-5 pt-7">
          {/* name, price, badges */}
          <View className="gap-2">
            <View className="flex-row flex-wrap items-center gap-2">
              <Text className="text-xs font-bold uppercase tracking-widest text-gold">
                {product.style} {product.category === 'tie' ? 'Tie' : 'Belt'}
              </Text>
              {product.isNew ? (
                <View className="rounded-full bg-goldLight px-2 py-0.5">
                  <Text className="text-[10px] font-bold uppercase tracking-widest text-ink">New</Text>
                </View>
              ) : null}
            </View>
            <Text className="font-display text-3xl leading-10 text-ink">{product.name}</Text>
            <View className="flex-row items-baseline gap-3">
              <Text className={`font-display text-2xl ${discount > 0 ? 'text-danger' : 'text-ink'}`}>{formatPrice(product.price)}</Text>
              {discount > 0 && product.compareAtPrice ? (
                <>
                  <Text className="text-base text-muted line-through">{formatPrice(product.compareAtPrice)}</Text>
                  <View className="rounded-full bg-danger px-2.5 py-1">
                    <Text className="text-xs font-bold text-white">Save {discount}%</Text>
                  </View>
                </>
              ) : null}
            </View>
            <View className="flex-row flex-wrap items-center gap-3 pt-1">
              <View className="flex-row items-center gap-2 rounded-full bg-surface px-3 py-1.5">
                <View className="h-4 w-4 rounded-full border border-line" style={{ backgroundColor: colourHex(product.colour) }} />
                <Text className="text-sm font-semibold text-ink">{product.colour}</Text>
              </View>
              <View className={`flex-row items-center gap-1.5 rounded-full px-3 py-1.5 ${product.inStock ? 'bg-success/10' : 'bg-danger/10'}`}>
                <View className={`h-2 w-2 rounded-full ${product.inStock ? 'bg-success' : 'bg-danger'}`} />
                <Text className={`text-sm font-semibold ${product.inStock ? 'text-success' : 'text-danger'}`}>
                  {product.inStock ? 'In stock' : 'Sold out'}
                </Text>
              </View>
            </View>
          </View>

          {/* size picker */}
          {product.sizes ? (
            <View className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="font-display text-xl text-ink">Size</Text>
                {vm.size ? <Text className="font-semibold text-gold">{vm.size}</Text> : null}
              </View>
              <View className="flex-row flex-wrap gap-2.5">
                {product.sizes.map((size) => {
                  const selected = vm.size === size;
                  return (
                    <Pressable
                      key={size}
                      onPress={() => vm.chooseSize(size)}
                      disabled={!product.inStock}
                      accessibilityRole="button"
                      accessibilityState={{ selected, disabled: !product.inStock }}
                      className={`min-w-[64px] items-center rounded-2xl border px-4 py-3 active:opacity-80 ${
                        selected ? 'border-ink bg-ink' : vm.sizeError ? 'border-danger bg-surface' : 'border-line bg-surface'
                      } ${!product.inStock ? 'opacity-40' : ''}`}
                    >
                      <Text className={`font-bold ${selected ? 'text-goldLight' : 'text-ink'}`}>{size}</Text>
                    </Pressable>
                  );
                })}
              </View>
              {vm.sizeError ? (
                <View className="flex-row items-center gap-1.5">
                  <Ionicons name="alert-circle" size={14} color={colors.danger} />
                  <Text className="text-sm text-danger">{vm.sizeError}</Text>
                </View>
              ) : null}
            </View>
          ) : null}

          {/* quantity */}
          {product.inStock ? (
            <View className="flex-row items-center justify-between rounded-3xl bg-surface px-5 py-3">
              <Text className="font-display text-xl text-ink">Quantity</Text>
              <View className="flex-row items-center rounded-full bg-cream p-1">
                <Pressable
                  onPress={() => vm.changeQuantity(vm.quantity - 1)}
                  accessibilityRole="button"
                  accessibilityLabel="Decrease quantity"
                  className="h-9 w-9 items-center justify-center rounded-full bg-surface active:opacity-70"
                >
                  <Ionicons name="remove" size={17} color={colors.ink} />
                </Pressable>
                <Text className="min-w-10 text-center text-base font-bold text-ink">{vm.quantity}</Text>
                <Pressable
                  onPress={() => vm.changeQuantity(vm.quantity + 1)}
                  accessibilityRole="button"
                  accessibilityLabel="Increase quantity"
                  className="h-9 w-9 items-center justify-center rounded-full bg-ink active:opacity-70"
                >
                  <Ionicons name="add" size={17} color={colors.goldLight} />
                </Pressable>
              </View>
            </View>
          ) : null}

          {/* collapsible information */}
          <View className="gap-3">
            <Accordion title="Details" icon="document-text-outline" initiallyOpen>
              <Text className="text-base leading-7 text-ink/80">{product.description}</Text>
              <View className="flex-row flex-wrap gap-2.5">
                {product.occasions.map((occasion) => (
                  <View key={occasion} className="flex-row items-center gap-2 rounded-2xl bg-cream px-3.5 py-2.5">
                    <Ionicons name={OCCASION_ICONS[occasion]} size={15} color={colors.gold} />
                    <Text className="text-sm font-semibold capitalize text-ink">{occasion}</Text>
                  </View>
                ))}
              </View>
            </Accordion>

            {product.sizes ? (
              <Accordion title="Size guide" icon="resize-outline">
                <Text className="text-sm text-muted">Choose the belt size about 5 cm larger than your waist.</Text>
                <View className="overflow-hidden rounded-2xl border border-line">
                  <View className="flex-row bg-ink px-4 py-2.5">
                    <Text className="flex-1 text-xs font-bold uppercase tracking-widest text-goldLight">Belt size</Text>
                    <Text className="flex-1 text-xs font-bold uppercase tracking-widest text-goldLight">Fits waist</Text>
                  </View>
                  {SIZE_GUIDE.map((row, index) => (
                    <View key={row.size} className={`flex-row px-4 py-2.5 ${index % 2 ? 'bg-cream' : 'bg-surface'}`}>
                      <Text className="flex-1 font-semibold text-ink">{row.size}</Text>
                      <Text className="flex-1 text-ink">{row.waist}</Text>
                    </View>
                  ))}
                </View>
              </Accordion>
            ) : null}

            <Accordion title="Care" icon="sparkles-outline">
              {CARE[product.category].map((tip) => (
                <View key={tip} className="flex-row gap-3">
                  <View className="mt-2 h-1.5 w-1.5 rounded-full bg-gold" />
                  <Text className="flex-1 leading-6 text-ink/80">{tip}</Text>
                </View>
              ))}
            </Accordion>
          </View>

          <Pressable
            onPress={() => navigation.navigate('Main', { screen: 'Styling' })}
            accessibilityRole="button"
            className="flex-row items-center gap-4 rounded-3xl bg-ink p-5 active:opacity-90"
          >
            <View className="h-11 w-11 items-center justify-center rounded-full bg-goldLight/15">
              <Ionicons name="sparkles" size={20} color={colors.goldLight} />
            </View>
            <View className="flex-1">
              <Text className="font-display text-lg text-white">Not sure it matches?</Text>
              <Text className="text-sm text-slate-300">Ask the personal stylist</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.goldLight} />
          </Pressable>
        </View>

        {/* You may also like */}
        {vm.related.length > 0 ? (
          <View className="mt-8 gap-4">
            <View className="px-5">
              <SectionHeader eyebrow="More from Teraz" title="You may also like" />
            </View>
            <FlatList
              horizontal
              data={vm.related}
              keyExtractor={(item) => `related-${item.id}`}
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="gap-3 px-5 pb-2"
              renderItem={({ item }) => (
                <ProductCard
                  product={item}
                  width={172}
                  onPress={() => navigation.push('ProductDetails', { productId: item.id })}
                  isFavourite={isFavourite(item.id)}
                  onToggleFavourite={() => toggleFavourite(item)}
                />
              )}
            />
          </View>
        ) : null}
      </ScrollView>

      {/* fixed bottom bar */}
      <View
        className="absolute bottom-0 left-0 right-0 flex-row items-center gap-4 rounded-t-[28px] bg-surface px-5 pt-4 shadow-lg"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <View>
          <Text className="text-xs font-bold uppercase tracking-widest text-muted">Total</Text>
          <Text className="font-display text-2xl text-ink">{formatPrice(product.price * vm.quantity)}</Text>
        </View>
        <View className="flex-1">
          {vm.added ? (
            <AppButton label="View cart" variant="dark" icon="bag-check-outline" onPress={() => navigation.navigate('Main', { screen: 'Cart' })} />
          ) : (
            <AppButton
              label={product.inStock ? 'Add to cart' : 'Sold out'}
              icon={product.inStock ? 'bag-add-outline' : undefined}
              onPress={vm.add}
              disabled={!product.inStock}
            />
          )}
        </View>
      </View>
    </View>
  );
}
