import { Animated, Image, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme/tokens';

const ANNOUNCEMENT_HEIGHT = 30;
export const HEADER_HEIGHT = 58;

type Props = {
  scrollY: Animated.Value;
  itemCount: number;
  onAnnouncement: () => void;
  onSearch: () => void;
  onAccount: () => void;
  onCart: () => void;
};

export function HomeHeader({ scrollY, itemCount, onAnnouncement, onSearch, onAccount, onCart }: Props) {
  const insets = useSafeAreaInsets();

  const barOpacity = scrollY.interpolate({ inputRange: [0, 90], outputRange: [0, 1], extrapolate: 'clamp' });
  const announcementOpacity = scrollY.interpolate({ inputRange: [0, 40], outputRange: [1, 0], extrapolate: 'clamp' });
  const slideUp = scrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [0, -ANNOUNCEMENT_HEIGHT],
    extrapolate: 'clamp',
  });

  const icon = (name: keyof typeof Ionicons.glyphMap, label: string, onPress: () => void, badge?: number) => (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={10}
      className="h-10 w-10 items-center justify-center active:opacity-60"
    >
      <Ionicons name={name} size={23} color={colors.goldLight} />
      {badge ? (
        <View className="absolute right-0 top-0.5 h-[18px] min-w-[18px] items-center justify-center rounded-full bg-goldLight px-1">
          <Text className="text-[10px] font-bold text-ink">{badge}</Text>
        </View>
      ) : null}
    </Pressable>
  );

  return (
    <Animated.View
      pointerEvents="box-none"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, transform: [{ translateY: slideUp }] }}
    >
      <Animated.View
        pointerEvents="none"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.ink, opacity: barOpacity }}
      />

      <View style={{ paddingTop: insets.top }}>
        <Animated.View style={{ height: ANNOUNCEMENT_HEIGHT, opacity: announcementOpacity }}>
          <Pressable onPress={onAnnouncement} accessibilityRole="button" className="flex-1 items-center justify-center active:opacity-70">
            <View className="flex-row items-center gap-2 border-b border-goldLight/60 px-6 pb-1">
              <Text className="font-display-semi text-[13px] text-goldLight">New wedding pieces are here</Text>
              <Ionicons name="arrow-forward" size={14} color={colors.goldLight} />
            </View>
          </Pressable>
        </Animated.View>

        <View style={{ height: HEADER_HEIGHT }} className="flex-row items-center justify-between px-4">
          <Image
            source={require('../../../../assets/teraz-logo.png')}
            style={{ width: 124, height: 28 }}
            resizeMode="contain"
            accessibilityLabel="Teraz"
          />
          <View className="flex-row items-center gap-1">
            {icon('search-outline', 'Search', onSearch)}
            {icon('person-outline', 'Your account', onAccount)}
            {icon('bag-handle-outline', `Cart, ${itemCount} items`, onCart, itemCount)}
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
