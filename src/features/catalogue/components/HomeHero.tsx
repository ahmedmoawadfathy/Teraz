import { Image, Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppDimensions } from '@/theme/layout';

type Props = {
  onShopNow: () => void;
};

// Size of assets/teraz-hero.jpg in pixels.
const PHOTO = { width: 1562, height: 2800 };
// Which part of the photo stays visible when it has to be cropped (0 = top, 1 = bottom).
// 0.1 keeps the faces, ties and belts in view on wide screens.
const FOCUS_Y = 0.1;

// Full-screen brand photo with the headline and the "Shop now" button, like a fashion storefront.
export function HomeHero({ onShopNow }: Props) {
  const { width, height, isWide } = useAppDimensions();
  const heroHeight = isWide ? height : Math.max(560, height * 0.88);

  // "cover" the hero box with the photo, cropping from the chosen focus point.
  const scale = Math.max(width / PHOTO.width, heroHeight / PHOTO.height);
  const photoWidth = PHOTO.width * scale;
  const photoHeight = PHOTO.height * scale;
  const left = (width - photoWidth) / 2;
  const top = -(photoHeight - heroHeight) * FOCUS_Y;

  return (
    <View style={{ width: '100%', height: heroHeight, overflow: 'hidden', backgroundColor: '#0E1424' }}>
      <Image
        source={require('../../../../assets/teraz-hero.jpg')}
        accessibilityLabel="Two men wearing Teraz ties and belts"
        style={{ position: 'absolute', left, top, width: photoWidth, height: photoHeight }}
      />
      {/* darken the top (for the header) and the bottom (for the text) */}
      <LinearGradient
        colors={['rgba(14,20,36,0.55)', 'rgba(14,20,36,0)', 'rgba(14,20,36,0.1)', 'rgba(14,20,36,0.85)']}
        locations={[0, 0.22, 0.55, 1]}
        style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingHorizontal: 28, paddingBottom: isWide ? 70 : 56 }}
      >
        <View className="items-center gap-6">
          <Text
            className="text-center font-display-regular text-[#EDE3CF]"
            style={{ fontSize: isWide ? 64 : 34, lineHeight: isWide ? 78 : 44 }}
          >
            The details are not the details.{'\n'}They make the design.
          </Text>
          <Pressable
            onPress={onShopNow}
            accessibilityRole="button"
            className="border border-[#EDE3CF] px-9 py-3.5 active:bg-white/10"
          >
            <Text className="font-display-regular text-sm uppercase tracking-[3px] text-[#EDE3CF]">Shop now</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}
