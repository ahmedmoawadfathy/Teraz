import { FlatList, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StateMessage } from '@/components/ui/StateMessage';
import type { MainTabScreenProps } from '@/app/navigation/types';
import { formatPrice } from '@/features/catalogue/api';
import { ProductImage } from '@/features/catalogue/components/ProductImage';
import { colors } from '@/theme/tokens';
import { useFavourites } from '../hooks/useFavourites';

export default function FavouritesScreen({ navigation }: MainTabScreenProps<'Favourites'>) {
  const { favourites, removeFavourite } = useFavourites();

  return (
    <FlatList
      className="flex-1 bg-cream"
      data={favourites}
      keyExtractor={(item) => item.id}
      contentContainerClassName="flex-grow gap-3 p-4"
      ListHeaderComponent={
        favourites.length > 0 ? (
          <Text className="text-muted">
            {favourites.length} saved {favourites.length === 1 ? 'item' : 'items'}
          </Text>
        ) : undefined
      }
      ListEmptyComponent={
        <StateMessage
          type="empty"
          icon="heart-outline"
          title="No favourites yet"
          message="Tap the heart on any tie or belt to save it here for later."
          actionLabel="Browse the collection"
          onAction={() => navigation.navigate('Home')}
        />
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
          accessibilityRole="button"
          className="flex-row items-center gap-3 rounded-2xl bg-surface p-3 active:opacity-70"
        >
          <ProductImage product={item} size="thumb" />
          <View className="flex-1 gap-1">
            <Text className="font-semibold text-ink">{item.name}</Text>
            <Text className="text-ink">{formatPrice(item.price)}</Text>
            {!item.inStock ? <Text className="text-xs font-semibold text-danger">Sold out</Text> : null}
          </View>
          <Pressable
            onPress={() => removeFavourite(item.id)}
            accessibilityRole="button"
            accessibilityLabel={`Remove ${item.name} from favourites`}
            hitSlop={8}
            className="p-2 active:opacity-70"
          >
            <Ionicons name="trash-outline" size={20} color={colors.danger} />
          </Pressable>
        </Pressable>
      )}
    />
  );
}
