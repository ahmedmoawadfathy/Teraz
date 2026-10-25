import { ScrollView, Text, View } from 'react-native';
import { StateMessage } from '@/components/ui/StateMessage';
import type { RootStackScreenProps } from '@/app/navigation/types';
import { colourHex } from '@/features/catalogue/colours';
import { ProductCard } from '@/features/catalogue/components/ProductCard';
import type { Product } from '@/features/catalogue/types';
import { useFavourites } from '@/features/favourites/hooks/useFavourites';
import { useStylingResults } from '../hooks/useStylingResults';

export default function StylingResultsScreen({ navigation, route }: RootStackScreenProps<'StylingResults'>) {
  const request = route.params;
  const { ties, belts, hasMatches, loading, error } = useStylingResults(request);
  const { isFavourite, toggleFavourite } = useFavourites();

  if (loading) return <StateMessage type="loading" message="Matching your outfit…" />;
  if (error) return <StateMessage type="error" title="Something went wrong" message={error} />;

  if (!hasMatches) {
    return (
      <StateMessage
        type="empty"
        icon="color-palette-outline"
        title="No match for this outfit"
        message="We don't have a tie or belt that suits this combination right now. Try a different colour or occasion."
        actionLabel="Change my outfit"
        onAction={() => navigation.goBack()}
      />
    );
  }

  // Two products per row, like the catalogue grid.
  function renderGrid(products: Product[]) {
    const rows: Product[][] = [];
    for (let i = 0; i < products.length; i += 2) rows.push(products.slice(i, i + 2));
    return rows.map((row) => (
      <View key={row[0].id} className="flex-row gap-3">
        {row.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
            isFavourite={isFavourite(product.id)}
            onToggleFavourite={() => toggleFavourite(product)}
          />
        ))}
        {row.length === 1 ? <View className="flex-1" /> : null}
      </View>
    ));
  }

  const outfit = [
    { label: 'Suit', value: request.suitColour },
    { label: 'Shirt', value: request.shirtColour },
    { label: 'Shoes', value: request.shoeColour },
  ];

  return (
    <ScrollView className="flex-1 bg-cream" contentContainerClassName="gap-5 p-4 pb-10">
      <View className="gap-3 rounded-2xl bg-ink p-4">
        <Text className="text-xs font-bold uppercase tracking-widest text-gold">Your outfit · {request.occasion}</Text>
        <View className="flex-row flex-wrap gap-x-4 gap-y-2">
          {outfit.map((item) => (
            <View key={item.label} className="flex-row items-center gap-2">
              <View className="h-4 w-4 rounded-full border border-slate-500" style={{ backgroundColor: colourHex(item.value) }} />
              <Text className="text-white">
                {item.label}: {item.value}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View className="gap-3">
        <Text className="text-lg font-bold text-ink">Recommended ties</Text>
        {ties.length > 0 ? (
          renderGrid(ties)
        ) : (
          <Text className="text-muted">No tie in stock matches this outfit yet.</Text>
        )}
      </View>

      <View className="gap-3">
        <Text className="text-lg font-bold text-ink">Recommended belts</Text>
        <Text className="text-sm text-muted">A belt should match your shoes.</Text>
        {belts.length > 0 ? (
          renderGrid(belts)
        ) : (
          <Text className="text-muted">No {request.shoeColour.toLowerCase()} belt in stock for this occasion.</Text>
        )}
      </View>
    </ScrollView>
  );
}
