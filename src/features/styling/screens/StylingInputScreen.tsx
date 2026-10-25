import { Pressable, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppButton } from '@/components/ui/AppButton';
import type { MainTabScreenProps } from '@/app/navigation/types';
import { OCCASIONS } from '@/features/catalogue/types';
import { colors } from '@/theme/tokens';
import { ChoiceGroup } from '../components/ChoiceGroup';
import { useStyling } from '../hooks/useStyling';
import { SHIRT_COLOURS, SHOE_COLOURS, SUIT_COLOURS } from '../stylingRules';

const OCCASION_ICONS = {
  wedding: 'heart-outline',
  business: 'briefcase-outline',
  formal: 'wine-outline',
  interview: 'chatbubbles-outline',
} as const;

export default function StylingInputScreen({ navigation }: MainTabScreenProps<'Styling'>) {
  const styling = useStyling();
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const chosen = [styling.suitColour, styling.shirtColour, styling.shoeColour, styling.occasion].filter(Boolean).length;

  function handleSubmit() {
    const request = styling.submit();
    if (request) navigation.navigate('StylingResults', request);
  }

  return (
    <View className="flex-1 bg-cream">
      {isFocused ? <StatusBar style="light" /> : null}
      <ScrollView contentContainerClassName="pb-10">
        <LinearGradient
          colors={[colors.ink, colors.navy]}
          style={{ paddingTop: insets.top + 18, paddingHorizontal: 20, paddingBottom: 32, borderBottomLeftRadius: 36, borderBottomRightRadius: 36 }}
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-bold uppercase tracking-[3px] text-goldLight">Personal stylist</Text>
            {chosen > 0 ? (
              <Pressable onPress={styling.reset} accessibilityRole="button" hitSlop={8} className="active:opacity-60">
                <Text className="text-sm font-semibold text-slate-300">Start again</Text>
              </Pressable>
            ) : null}
          </View>
          <Text className="mt-3 font-display text-[32px] leading-[40px] text-white">Build your look</Text>
          <Text className="mt-2 leading-6 text-slate-300">
            Tell us what you're wearing and where you're going. We'll pick the tie and belt that complete it.
          </Text>

          {/* progress */}
          <View className="mt-6 gap-2">
            <View className="flex-row gap-1.5">
              {[0, 1, 2, 3].map((index) => (
                <View key={index} className={`h-1.5 flex-1 rounded-full ${index < chosen ? 'bg-goldLight' : 'bg-white/15'}`} />
              ))}
            </View>
            <Text className="text-xs text-slate-400">{chosen} of 4 chosen</Text>
          </View>
        </LinearGradient>

        <View className="gap-4 px-5 pt-5">
          <ChoiceGroup
            step={1}
            title="Suit colour"
            options={SUIT_COLOURS}
            value={styling.suitColour}
            onChange={styling.setSuitColour}
            error={styling.errors.suitColour}
          />
          <ChoiceGroup
            step={2}
            title="Shirt colour"
            options={SHIRT_COLOURS}
            value={styling.shirtColour}
            onChange={styling.setShirtColour}
            error={styling.errors.shirtColour}
          />
          <ChoiceGroup
            step={3}
            title="Shoe colour"
            options={SHOE_COLOURS}
            value={styling.shoeColour}
            onChange={styling.setShoeColour}
            error={styling.errors.shoeColour}
          />
          <ChoiceGroup
            step={4}
            title="Occasion"
            variant="tile"
            icons={OCCASION_ICONS}
            options={OCCASIONS}
            value={styling.occasion}
            onChange={styling.setOccasion}
            error={styling.errors.occasion}
          />

          <View className="pt-2">
            <AppButton label="Find my match" icon="sparkles" onPress={handleSubmit} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
