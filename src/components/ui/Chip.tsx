import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/tokens';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
  swatch?: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

export function Chip({ label, selected, onPress, swatch, icon }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className={`flex-row items-center gap-2 rounded-full border px-4 py-2.5 active:opacity-70 ${
        selected ? 'border-ink bg-ink' : 'border-line bg-surface'
      }`}
    >
      {swatch ? (
        <View
          className={`h-4 w-4 rounded-full border ${selected ? 'border-goldLight' : 'border-line'}`}
          style={{ backgroundColor: swatch }}
        />
      ) : null}
      {icon ? <Ionicons name={icon} size={15} color={selected ? colors.goldLight : colors.ink} /> : null}
      <Text className={`text-sm font-semibold ${selected ? 'text-goldLight' : 'text-ink'}`}>{label}</Text>
    </Pressable>
  );
}
