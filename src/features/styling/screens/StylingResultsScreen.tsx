import { ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppButton } from '@/components/ui/AppButton';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StateMessage } from '@/components/ui/StateMessage';
import type { RootStackScreenProps } from '@/app/navigation/types';
import { colourHex } from '@/features/catalogue/colours';
import { ProductCard } from '@/features/catalogue/components/ProductCard';
import type { Product } from '@/features/catalogue/types';
import { useFavourites } from '@/features/favourites/hooks/useFavourites';
import { colors } from '@/theme/tokens';
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
    <ScrollView className="flex-1 bg-cream" contentContainerClassName="gap-7 px-5 pb-12 pt-2">
      <LinearGradient colors={[colors.ink, colors.navy]} style={{ borderRadius: 28, padding: 20, gap: 16 }}>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs font-bold uppercase tracking-[3px] text-goldLight">Your outfit</Text>
          <View className="rounded-full bg-goldLight/15 px-3 py-1">
            <Text className="text-xs font-bold capitalize text-goldLight">{request.occasion}</Text>
          </View>
        </View>
        <View className="flex-row justify-between">
          {outfit.map((item) => (
            <View key={item.label} className="items-center gap-2">
              <View className="h-14 w-14 rounded-full border-2 border-white/20" style={{ backgroundColor: colourHex(item.value) }} />
              <Text className="text-xs uppercase tracking-widest text-slate-400">{item.label}</Text>
              <Text className="font-semibold text-white">{item.value}</Text>
            </View>
          ))}
        </View>
        <Text className="text-center text-sm text-slate-300">
          {ties.length + belts.length} {ties.length + belts.length === 1 ? 'piece matches' : 'pieces match'} your look
        </Text>
      </LinearGradient>

      <View className="gap-4">
        <SectionHeader eyebrow="Our pick" title="Ties for this look" />
        {ties.length > 0 ? (
          renderGrid(ties)
        ) : (
          <Text className="text-muted">No tie in stock matches this outfit yet.</Text>
        )}
      </View>

      <View className="gap-4">
        <SectionHeader eyebrow="Match your shoes" title="Belts for this look" />
        {belts.length > 0 ? (
          renderGrid(belts)
        ) : (
          <Text className="text-muted">No {request.shoeColour.toLowerCase()} belt in stock for this occasion.</Text>
        )}
      </View>

      <AppButton label="Change my outfit" variant="ghost" icon="refresh" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}
