import { ScrollView, Text, View } from 'react-native';
import { AppButton } from '@/components/ui/AppButton';
import type { MainTabScreenProps } from '@/app/navigation/types';
import { OCCASIONS } from '@/features/catalogue/types';
import { ChoiceGroup } from '../components/ChoiceGroup';
import { useStyling } from '../hooks/useStyling';
import { SHIRT_COLOURS, SHOE_COLOURS, SUIT_COLOURS } from '../stylingRules';

export default function StylingInputScreen({ navigation }: MainTabScreenProps<'Styling'>) {
  const styling = useStyling();

  function handleSubmit() {
    const request = styling.submit();
    if (request) navigation.navigate('StylingResults', request);
  }

  return (
    <ScrollView className="flex-1 bg-cream" contentContainerClassName="gap-6 p-4 pb-10">
      <View className="gap-1">
        <Text className="text-2xl font-bold text-ink">Build your look</Text>
        <Text className="text-muted">
          Tell us what you are wearing and where you are going. We will suggest ties and belts from the Teraz collection.
        </Text>
      </View>

      <ChoiceGroup
        title="Suit colour"
        options={SUIT_COLOURS}
        value={styling.suitColour}
        onChange={styling.setSuitColour}
        error={styling.errors.suitColour}
        showSwatch
      />
      <ChoiceGroup
        title="Shirt colour"
        options={SHIRT_COLOURS}
        value={styling.shirtColour}
        onChange={styling.setShirtColour}
        error={styling.errors.shirtColour}
        showSwatch
      />
      <ChoiceGroup
        title="Shoe colour"
        options={SHOE_COLOURS}
        value={styling.shoeColour}
        onChange={styling.setShoeColour}
        error={styling.errors.shoeColour}
        showSwatch
      />
      <ChoiceGroup
        title="Occasion"
        options={OCCASIONS}
        value={styling.occasion}
        onChange={styling.setOccasion}
        error={styling.errors.occasion}
      />

      <View className="gap-3">
        <AppButton label="Get suggestions" onPress={handleSubmit} />
        <AppButton label="Start again" variant="ghost" onPress={styling.reset} />
      </View>
    </ScrollView>
  );
}
