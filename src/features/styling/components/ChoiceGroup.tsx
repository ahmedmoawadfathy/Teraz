import { Text, View } from 'react-native';
import { Chip } from '@/components/ui/Chip';
import { colourHex } from '@/features/catalogue/colours';

type Props<T extends string> = {
  title: string;
  options: T[];
  value: T | null;
  onChange: (value: T) => void;
  error?: string;
  showSwatch?: boolean;
};

// One question of the outfit form: a title, its options and its error.
export function ChoiceGroup<T extends string>({ title, options, value, onChange, error, showSwatch = false }: Props<T>) {
  return (
    <View className="gap-2">
      <Text className="font-semibold text-ink">{title}</Text>
      <View className="flex-row flex-wrap gap-2">
        {options.map((option) => (
          <Chip
            key={option}
            label={option.charAt(0).toUpperCase() + option.slice(1)}
            swatch={showSwatch ? colourHex(option) : undefined}
            selected={value === option}
            onPress={() => onChange(option)}
          />
        ))}
      </View>
      {error ? <Text className="text-sm text-danger">{error}</Text> : null}
    </View>
  );
}
