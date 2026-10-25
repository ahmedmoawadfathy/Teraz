import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppButton } from '@/components/ui/AppButton';
import { StateMessage } from '@/components/ui/StateMessage';
import type { RootStackScreenProps } from '@/app/navigation/types';
import { useCart } from '@/features/cart/hooks/useCart';
import { useFavourites } from '@/features/favourites/hooks/useFavourites';
import { formatPrice } from '../api';
import { colourHex } from '../colours';
import { ProductImage } from '../components/ProductImage';
import { useProductDetails } from '../hooks/useProductDetails';

export default function ProductDetailsScreen({ navigation, route }: RootStackScreenProps<'ProductDetails'>) {
  const { product, loading, error } = useProductDetails(route.params.productId);
  const { isFavourite, toggleFavourite } = useFavourites();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  if (loading) return <StateMessage type="loading" />;
  if (error || !product) {
    return (
      <StateMessage
        type="error"
        title="Product not found"
        message={error ?? 'This product is no longer available.'}
        actionLabel="Go back"
        onAction={() => navigation.goBack()}
      />
    );
  }

  const saved = isFavourite(product.id);

  function handleAddToCart() {
    if (!product) return;
    addToCart(product);
    setAdded(true);
  }

  return (
    <ScrollView className="flex-1 bg-cream" contentContainerClassName="gap-5 p-4 pb-10">
      <ProductImage product={product} size="large" />

      <View className="gap-1">
        <Text className="text-xs font-bold uppercase tracking-widest text-gold">
          {product.category === 'tie' ? 'Tie' : 'Belt'} · {product.style}
        </Text>
        <Text className="text-2xl font-bold text-ink">{product.name}</Text>
        <Text className="text-xl font-semibold text-ink">{formatPrice(product.price)}</Text>
      </View>

      <View className="flex-row flex-wrap gap-4">
        <View className="flex-row items-center gap-2">
          <View className="h-5 w-5 rounded-full border border-line" style={{ backgroundColor: colourHex(product.colour) }} />
          <Text className="text-ink">{product.colour}</Text>
        </View>
        <Text className={`font-semibold ${product.inStock ? 'text-success' : 'text-danger'}`}>
          {product.inStock ? 'In stock' : 'Sold out'}
        </Text>
      </View>

      <Text className="leading-6 text-ink">{product.description}</Text>

      <View className="gap-2">
        <Text className="font-semibold text-ink">Suits these occasions</Text>
        <View className="flex-row flex-wrap gap-2">
          {product.occasions.map((occasion) => (
            <View key={occasion} className="rounded-full bg-surface px-3 py-1.5">
              <Text className="text-sm capitalize text-ink">{occasion}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="gap-3">
        <AppButton
          label={!product.inStock ? 'Sold out' : added ? 'Added — add another' : 'Add to cart'}
          onPress={handleAddToCart}
          disabled={!product.inStock}
        />
        {added ? (
          <AppButton label="Go to cart" variant="ghost" onPress={() => navigation.navigate('Main', { screen: 'Cart' })} />
        ) : null}
        <AppButton
          label={saved ? 'Remove from favourites' : 'Save to favourites'}
          variant="ghost"
          onPress={() => toggleFavourite(product)}
        />
      </View>
    </ScrollView>
  );
}
