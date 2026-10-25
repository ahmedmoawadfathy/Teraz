import { FlatList, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Chip } from '@/components/ui/Chip';
import { StateMessage } from '@/components/ui/StateMessage';
import type { RootStackScreenProps } from '@/app/navigation/types';
import { useFavourites } from '@/features/favourites/hooks/useFavourites';
import { colors } from '@/theme/tokens';
import { colourHex } from '../colours';
import { ProductCard } from '../components/ProductCard';
import { AVAILABILITY_OPTIONS, PRICE_RANGES, useProductSearch } from '../hooks/useProductSearch';
import { SORT_OPTIONS, type Category } from '../types';

const CATEGORIES: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'tie', label: 'Ties' },
  { value: 'belt', label: 'Belts' },
];

function FilterRow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-2.5">
      <Text className="px-5 text-xs font-bold uppercase tracking-widest text-muted">{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 px-5">
        {children}
      </ScrollView>
    </View>
  );
}

export default function SearchScreen({ navigation }: RootStackScreenProps<'Search'>) {
  const search = useProductSearch();
  const { isFavourite, toggleFavourite } = useFavourites();

  const filters = (
    <View className="gap-5 pb-3">
      <View className="px-5">
        <View className="flex-row items-center gap-3 rounded-full border border-line bg-surface px-5 shadow-sm">
          <Ionicons name="search" size={18} color={colors.gold} />
          <TextInput
            value={search.query}
            onChangeText={search.setQuery}
            placeholder="Search by name or style"
            placeholderTextColor="#A3A7B0"
            autoFocus
            returnKeyType="search"
            accessibilityLabel="Search products"
            className="flex-1 py-4 text-base text-ink"
          />
          {search.query ? (
            <Pressable onPress={() => search.setQuery('')} accessibilityRole="button" accessibilityLabel="Clear search" hitSlop={8}>
              <Ionicons name="close-circle" size={18} color={colors.muted} />
            </Pressable>
          ) : null}
        </View>
      </View>

      <FilterRow title="Category">
        {CATEGORIES.map((item) => (
          <Chip
            key={item.value}
            label={item.label}
            selected={search.category === item.value}
            onPress={() => search.setCategory(item.value)}
          />
        ))}
      </FilterRow>

      <FilterRow title="Colour">
        {search.colourOptions.map((name) => (
          <Chip
            key={name}
            label={name}
            swatch={colourHex(name)}
            selected={search.colour === name}
            onPress={() => search.setColour(search.colour === name ? null : name)}
          />
        ))}
      </FilterRow>

      <FilterRow title="Sort by">
        {SORT_OPTIONS.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            icon={search.sort === option.value ? 'swap-vertical' : undefined}
            selected={search.sort === option.value}
            onPress={() => search.setSort(option.value)}
          />
        ))}
      </FilterRow>

      <FilterRow title="Availability">
        {AVAILABILITY_OPTIONS.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            selected={search.availability === option.value}
            onPress={() => search.setAvailability(option.value)}
          />
        ))}
      </FilterRow>

      <FilterRow title="Price (EGP)">
        {PRICE_RANGES.map((range) => (
          <Chip
            key={range.value}
            label={range.label}
            selected={search.priceRange === range.value}
            onPress={() => search.setPriceRange(range.value)}
          />
        ))}
      </FilterRow>

      <View className="flex-row items-center justify-between px-5 pt-1">
        <Text className="font-display text-xl text-ink">
          {search.results.length} {search.results.length === 1 ? 'piece' : 'pieces'}
        </Text>
        {search.hasFilters ? (
          <Pressable onPress={search.clearFilters} accessibilityRole="button" hitSlop={8} className="active:opacity-60">
            <Text className="font-semibold text-gold">Clear all</Text>
          </Pressable>
        ) : null}
      </View>
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
      columnWrapperClassName="gap-3 px-5"
      contentContainerClassName="gap-3 pb-10 pt-2"
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={filters}
      ListEmptyComponent={
        <StateMessage
          type="empty"
          icon="search-outline"
          title="No results found"
          message="No pieces match your search. Try another word or fewer filters."
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
