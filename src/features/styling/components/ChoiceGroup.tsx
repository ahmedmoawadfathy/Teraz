import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colourHex } from '@/features/catalogue/colours';
import { colors } from '@/theme/tokens';

type Props<T extends string> = {
  step: number;
  title: string;
  options: T[];
  value: T | null;
  onChange: (value: T) => void;
  error?: string;
  variant?: 'swatch' | 'tile';
  icons?: Partial<Record<T, keyof typeof Ionicons.glyphMap>>;
};

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

// One step of the outfit form: a numbered title, its options and its error.
export function ChoiceGroup<T extends string>({ step, title, options, value, onChange, error, variant = 'swatch', icons }: Props<T>) {
  const done = value !== null;

  return (
    <View className="gap-4 rounded-[28px] bg-surface p-5 shadow-sm">
      <View className="flex-row items-center gap-3">
        <View className={`h-8 w-8 items-center justify-center rounded-full ${done ? 'bg-gold' : 'bg-ink'}`}>
          {done ? (
            <Ionicons name="checkmark" size={16} color={colors.ink} />
          ) : (
            <Text className="text-sm font-bold text-goldLight">{step}</Text>
          )}
        </View>
        <Text className="flex-1 font-display text-xl text-ink">{title}</Text>
        {value ? <Text className="text-sm font-semibold text-gold">{capitalise(value)}</Text> : null}
      </View>

      {variant === 'swatch' ? (
        <View className="flex-row flex-wrap gap-4">
          {options.map((option) => {
            const selected = value === option;
            return (
              <Pressable
                key={option}
                onPress={() => onChange(option)}
                accessibilityRole="button"
                accessibilityLabel={option}
                accessibilityState={{ selected }}
                className="items-center gap-2 active:opacity-70"
              >
                <View className={`rounded-full p-1 ${selected ? 'border-2 border-gold' : 'border-2 border-transparent'}`}>
                  <View
                    className="h-12 w-12 items-center justify-center rounded-full border border-line"
                    style={{ backgroundColor: colourHex(option) }}
                  >
                    {selected ? <Ionicons name="checkmark" size={20} color={option === 'White' ? colors.ink : '#FFFFFF'} /> : null}
                  </View>
                </View>
                <Text className={`text-xs ${selected ? 'font-bold text-ink' : 'text-muted'}`}>{option}</Text>
              </Pressable>
            );
          })}
        </View>
      ) : (
        <View className="flex-row flex-wrap gap-3">
          {options.map((option) => {
            const selected = value === option;
            return (
              <Pressable
                key={option}
                onPress={() => onChange(option)}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                className={`w-[47%] flex-row items-center gap-3 rounded-2xl border px-4 py-4 active:opacity-80 ${
                  selected ? 'border-ink bg-ink' : 'border-line bg-cream'
                }`}
              >
                <Ionicons name={icons?.[option] ?? 'ellipse-outline'} size={20} color={selected ? colors.goldLight : colors.gold} />
                <Text className={`font-bold ${selected ? 'text-goldLight' : 'text-ink'}`}>{capitalise(option)}</Text>
              </Pressable>
            );
          })}
        </View>
      )}

      {/* hide the error as soon as an option is chosen */}
      {error && !done ? (
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="alert-circle" size={14} color={colors.danger} />
          <Text className="text-sm text-danger">{error}</Text>
        </View>
      ) : null}
    </View>
  );
}
