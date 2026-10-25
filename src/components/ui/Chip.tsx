import { Pressable, Text, View } from 'react-native';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
  swatch?: string; // optional colour dot (hex)
};

// Selectable pill used for filters, colours and occasions.
export function Chip({ label, selected, onPress, swatch }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className={`flex-row items-center gap-2 rounded-full border px-4 py-2 active:opacity-70 ${
        selected ? 'border-ink bg-ink' : 'border-line bg-surface'
      }`}
    >
      {swatch ? (
        <View className="h-4 w-4 rounded-full border border-line" style={{ backgroundColor: swatch }} />
      ) : null}
      <Text className={`text-sm font-medium ${selected ? 'text-white' : 'text-ink'}`}>{label}</Text>
    </Pressable>
  );
}
