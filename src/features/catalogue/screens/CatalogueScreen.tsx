import { useRef, useState } from 'react';
import { Animated, FlatList, Image, Linking, Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StateMessage } from '@/components/ui/StateMessage';
import type { MainTabScreenProps } from '@/app/navigation/types';
import { useCart } from '@/features/cart/hooks/useCart';
import { useFavourites } from '@/features/favourites/hooks/useFavourites';
import { NewsletterSignup } from '@/features/newsletter/components/NewsletterSignup';
import { useAppDimensions } from '@/theme/layout';
import { colors } from '@/theme/tokens';
import { HEADER_HEIGHT, HomeHeader } from '../components/HomeHeader';
import { HomeHero } from '../components/HomeHero';
import { ProductCard } from '../components/ProductCard';
import { useCatalogue } from '../hooks/useCatalogue';
import type { Category, Product } from '../types';

const CATEGORIES: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'tie', label: 'Ties' },
  { value: 'belt', label: 'Belts' },
];

// Category tiles use crops of the brand photo.
const CATEGORY_TILES = [
  { value: 'belt' as const, label: 'Belts', image: require('../../../../assets/tile-belts.jpg') },
  { value: 'tie' as const, label: 'Ties', image: require('../../../../assets/tile-ties.jpg') },
  { value: 'all' as const, label: 'All', image: require('../../../../assets/tile-all.jpg') },
];

export default function CatalogueScreen({ navigation }: MainTabScreenProps<'Home'>) {
  const { products, featured, loading, error, category, setCategory, reload } = useCatalogue();
  const { isFavourite, toggleFavourite } = useFavourites();
  const { itemCount } = useCart();
  const isFocused = useIsFocused();
  const { width: screenWidth, columns } = useAppDimensions();
  // three tiles side by side: screen width minus 20px padding each side and two 10px gaps
  // (capped so they stay a sensible size on a computer screen)
  const tileWidth = Math.min((screenWidth - 40 - 20) / 3, 280);

  const listRef = useRef<FlatList<Product>>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [collectionY, setCollectionY] = useState(0);

  const openProduct = (productId: string) => navigation.navigate('ProductDetails', { productId });

  // Category tile: filter the collection and scroll down to it (below the fixed header).
  function shopCategory(value: Category | 'all') {
    setCategory(value);
    listRef.current?.scrollToOffset({ offset: Math.max(0, collectionY - HEADER_HEIGHT - 50), animated: true });
  }

  const header = (
    <View className="pb-4">
      <HomeHero onShopNow={() => navigation.navigate('Search')} />

      {/* Shop by category: three tiles side by side */}
      <View className="mt-8 gap-4 px-5">
        <SectionHeader eyebrow="Explore" title="Shop by category" />
        <View className="flex-row justify-center gap-2.5">
          {CATEGORY_TILES.map((tile) => (
            <Pressable
              key={tile.value}
              onPress={() => shopCategory(tile.value)}
              accessibilityRole="button"
              accessibilityLabel={`Shop ${tile.label}`}
              className="gap-2 active:opacity-80"
              style={{ width: tileWidth }}
            >
              <Image
                source={tile.image}
                resizeMode="cover"
                style={{ width: tileWidth, height: (tileWidth * 4) / 3, borderRadius: 18, backgroundColor: colors.sand }}
              />
              <View className="flex-row items-center justify-center gap-1">
                <Text className="font-display text-base text-ink">{tile.label}</Text>
                <Ionicons name="arrow-forward" size={13} color={colors.gold} />
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      {/* New arrivals */}
      {featured.length > 0 ? (
        <View className="mt-9 gap-4">
          <View className="px-5">
            <SectionHeader eyebrow="Just in" title="New arrivals" />
          </View>
          <FlatList
            horizontal
            data={featured}
            keyExtractor={(item) => `featured-${item.id}`}
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-3 px-5 pb-2"
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                width={172}
                onPress={() => openProduct(item.id)}
                isFavourite={isFavourite(item.id)}
                onToggleFavourite={() => toggleFavourite(item)}
              />
            )}
          />
        </View>
      ) : null}

      {/* Personal stylist card */}
      <Pressable
        onPress={() => navigation.navigate('Styling')}
        accessibilityRole="button"
        className="mx-5 mt-8 overflow-hidden rounded-[28px] shadow-lg active:opacity-90"
      >
        <LinearGradient
          colors={[colors.goldLight, colors.gold]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 16, padding: 20 }}
        >
          <View className="flex-1 gap-1">
            <Text className="text-[11px] font-bold uppercase tracking-widest text-ink/70">Personal stylist</Text>
            <Text className="font-display text-xl text-ink">Match your outfit in seconds</Text>
            <Text className="text-sm text-ink/70">Suit · shirt · shoes · occasion</Text>
          </View>
          <View className="h-14 w-14 items-center justify-center rounded-full bg-ink">
            <Ionicons name="sparkles" size={24} color={colors.goldLight} />
          </View>
        </LinearGradient>
      </Pressable>

      {/* Collection + category filter */}
      <View className="mt-8 gap-4 px-5" onLayout={(event) => setCollectionY(event.nativeEvent.layout.y)}>
        <SectionHeader eyebrow="Shop" title="The collection" actionLabel="View all" onAction={() => navigation.navigate('Search')} />
        {/* segmented switch: All / Ties / Belts */}
        <View className="flex-row rounded-full bg-sand p-1.5">
          {CATEGORIES.map((item) => {
            const selected = category === item.value;
            return (
              <Pressable
                key={item.value}
                onPress={() => setCategory(item.value)}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                className={`flex-1 items-center rounded-full py-3 active:opacity-80 ${selected ? 'bg-ink' : ''}`}
              >
                <Text className={`text-sm font-bold ${selected ? 'text-goldLight' : 'text-ink/70'}`}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );

  const footer = (
    <View className="mt-6 gap-6 px-5">
      {/* Lifestyle banner */}
      <LinearGradient
        colors={[colors.navy, colors.ink]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 32, padding: 26, overflow: 'hidden' }}
      >
        <Image
          source={require('../../../../assets/teraz-mark.png')}
          resizeMode="contain"
          style={{ position: 'absolute', right: -24, bottom: -20, width: 170, height: 170, opacity: 0.12 }}
        />
        <Text className="text-xs font-bold uppercase tracking-[3px] text-goldLight">For the moments that matter</Text>
        <Text className="mt-3 font-display text-[28px] leading-9 text-white">
          You don't just dress.{'\n'}You make an entrance.
        </Text>
        <Pressable
          onPress={() => navigation.navigate('Search')}
          accessibilityRole="button"
          className="mt-6 flex-row items-center gap-2 self-start rounded-full bg-goldLight px-6 py-3.5 active:opacity-80"
        >
          <Text className="font-bold text-ink">Shop now</Text>
          <Ionicons name="arrow-forward" size={16} color={colors.ink} />
        </Pressable>
      </LinearGradient>

      <NewsletterSignup />

      {/* Footer */}
      <View className="items-center gap-3 pb-4 pt-2">
        <Image
          source={require('../../../../assets/teraz-mark.png')}
          resizeMode="contain"
          style={{ width: 40, height: 40 }}
          accessibilityLabel="Teraz"
        />
        <Text className="text-xs font-bold uppercase tracking-[4px] text-gold">Ties · Belts · Styling</Text>
        <Pressable onPress={() => Linking.openURL('https://teraztie.com')} accessibilityRole="link" hitSlop={8}>
          <Text className="font-semibold text-ink underline">teraztie.com</Text>
        </Pressable>
        <Text className="text-xs text-muted">© 2026 Teraz. All rights reserved.</Text>
      </View>
    </View>
  );

  if (loading) return <StateMessage type="loading" message="Loading the collection…" />;
  if (error) return <StateMessage type="error" title="Something went wrong" message={error} actionLabel="Try again" onAction={reload} />;

  return (
    <View className="flex-1 bg-cream">
      {isFocused ? <StatusBar style="light" /> : null}
      <Animated.FlatList
        ref={listRef}
        className="flex-1 bg-cream"
        data={products}
        keyExtractor={(item) => item.id}
        key={`grid-${columns}`}
        numColumns={columns}
        columnWrapperClassName="gap-3 px-5"
        contentContainerClassName="gap-3 pb-10"
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        ListHeaderComponent={header}
        ListFooterComponent={footer}
        ListEmptyComponent={<StateMessage type="empty" title="No pieces here yet" message="Check back soon for new arrivals." />}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => openProduct(item.id)}
            isFavourite={isFavourite(item.id)}
            onToggleFavourite={() => toggleFavourite(item)}
          />
        )}
      />
      <HomeHeader
        scrollY={scrollY}
        itemCount={itemCount}
        onAnnouncement={() => navigation.navigate('Search')}
        onSearch={() => navigation.navigate('Search')}
        onAccount={() => navigation.navigate('Profile')}
        onCart={() => navigation.navigate('Cart')}
      />
    </View>
  );
}
