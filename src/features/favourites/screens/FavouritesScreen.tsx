import { FlatList, Text, View } from 'react-native';
import { StateMessage } from '@/components/ui/StateMessage';
import type { MainTabScreenProps } from '@/app/navigation/types';
import { ProductCard } from '@/features/catalogue/components/ProductCard';
import { useFavourites } from '../hooks/useFavourites';

export default function FavouritesScreen({ navigation }: MainTabScreenProps<'Favourites'>) {
  const { favourites, isFavourite, toggleFavourite } = useFavourites();

  return (
    <FlatList
      className="flex-1 bg-cream"
      data={favourites}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperClassName="gap-3 px-5"
      contentContainerClassName="flex-grow gap-3 pb-10"
      ListHeaderComponent={
        favourites.length > 0 ? (
          <View className="px-5 pb-2">
            <Text className="text-muted">
              {favourites.length} saved {favourites.length === 1 ? 'piece' : 'pieces'} · tap the heart to remove
            </Text>
          </View>
        ) : undefined
      }
      ListEmptyComponent={
        <StateMessage
          type="empty"
          icon="heart-outline"
          title="Nothing saved yet"
          message="Tap the heart on any tie or belt to keep it here for later."
          actionLabel="Explore the collection"
          onAction={() => navigation.navigate('Home')}
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
