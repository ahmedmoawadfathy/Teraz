import { FlatList, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Chip } from '@/components/ui/Chip';
import { StateMessage } from '@/components/ui/StateMessage';
import type { MainTabScreenProps } from '@/app/navigation/types';
import { useFavourites } from '@/features/favourites/hooks/useFavourites';
import { colors } from '@/theme/tokens';
import { ProductCard } from '../components/ProductCard';
import { useCatalogue } from '../hooks/useCatalogue';
import type { Category } from '../types';

const CATEGORIES: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'tie', label: 'Ties' },
  { value: 'belt', label: 'Belts' },
];

export default function CatalogueScreen({ navigation }: MainTabScreenProps<'Home'>) {
  const { products, loading, error, category, setCategory, reload } = useCatalogue();
  const { isFavourite, toggleFavourite } = useFavourites();

  const header = (
    <View className="gap-4 pb-2">
      <Pressable
        onPress={() => navigation.navigate('Search')}
        accessibilityRole="search"
        className="flex-row items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 active:opacity-70"
      >
        <Ionicons name="search" size={18} color={colors.muted} />
        <Text className="text-muted">Search ties and belts</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('Styling')}
        accessibilityRole="button"
        className="gap-1 rounded-2xl bg-ink p-5 active:opacity-70"
      >
        <Text className="text-xs font-bold uppercase tracking-widest text-gold">Personal styling</Text>
        <Text className="text-xl font-bold text-white">Not sure what matches your suit?</Text>
        <Text className="text-slate-300">Tell us your outfit and occasion. We'll pick the tie and belt.</Text>
      </Pressable>

      <View className="flex-row gap-2">
        {CATEGORIES.map((item) => (
          <Chip
            key={item.value}
            label={item.label}
            selected={category === item.value}
            onPress={() => setCategory(item.value)}
          />
        ))}
      </View>
    </View>
  );

  if (loading) return <StateMessage type="loading" message="Loading the collection…" />;
  if (error) return <StateMessage type="error" title="Something went wrong" message={error} actionLabel="Try again" onAction={reload} />;

  return (
    <FlatList
      className="flex-1 bg-cream"
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperClassName="gap-3"
      contentContainerClassName="gap-3 p-4"
      ListHeaderComponent={header}
      ListEmptyComponent={<StateMessage type="empty" title="No products here yet" message="Check back soon for new pieces." />}
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
