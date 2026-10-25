import { FlatList, ScrollView, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Chip } from '@/components/ui/Chip';
import { StateMessage } from '@/components/ui/StateMessage';
import type { RootStackScreenProps } from '@/app/navigation/types';
import { useFavourites } from '@/features/favourites/hooks/useFavourites';
import { colors } from '@/theme/tokens';
import { colourHex } from '../colours';
import { ProductCard } from '../components/ProductCard';
import { PRICE_RANGES, useProductSearch } from '../hooks/useProductSearch';
import type { Category } from '../types';

const CATEGORIES: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'tie', label: 'Ties' },
  { value: 'belt', label: 'Belts' },
];

export default function SearchScreen({ navigation }: RootStackScreenProps<'Search'>) {
  const search = useProductSearch();
  const { isFavourite, toggleFavourite } = useFavourites();

  const filters = (
    <View className="gap-3 pb-2">
      <View className="flex-row items-center gap-3 rounded-xl border border-line bg-surface px-4">
        <Ionicons name="search" size={18} color={colors.muted} />
        <TextInput
          value={search.query}
          onChangeText={search.setQuery}
          placeholder="Search by name or style"
          placeholderTextColor="#9CA3AF"
          autoFocus
          returnKeyType="search"
          accessibilityLabel="Search products"
          className="flex-1 py-3 text-base text-ink"
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
        {CATEGORIES.map((item) => (
          <Chip
            key={item.value}
            label={item.label}
            selected={search.category === item.value}
            onPress={() => search.setCategory(item.value)}
          />
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
        {search.colourOptions.map((name) => (
          <Chip
            key={name}
            label={name}
            swatch={colourHex(name)}
            selected={search.colour === name}
            onPress={() => search.setColour(search.colour === name ? null : name)}
          />
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
        {PRICE_RANGES.map((range) => (
          <Chip
            key={range.value}
            label={range.label}
            selected={search.priceRange === range.value}
            onPress={() => search.setPriceRange(range.value)}
          />
        ))}
      </ScrollView>

      <Text className="text-sm text-muted">
        {search.results.length} {search.results.length === 1 ? 'result' : 'results'}
      </Text>
    </View>
  );

  if (search.loading) return <StateMessage type="loading" />;
  if (search.error) return <StateMessage type="error" title="Search is unavailable" message={search.error} />;

  return (
    <FlatList
      className="flex-1 bg-cream"
      data={search.results}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperClassName="gap-3"
      contentContainerClassName="gap-3 p-4"
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={filters}
      ListEmptyComponent={
        <StateMessage
          type="empty"
          icon="search-outline"
          title="No results found"
          message="No products match your search. Try another word or fewer filters."
          actionLabel={search.hasFilters ? 'Clear search and filters' : undefined}
          onAction={search.clearFilters}
        />
      }
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
          isFavourite={isFavourite(item.id)}
          onToggleFavourite={() => toggleFavourite(item)}
        />
      )}
    />
  );
}
