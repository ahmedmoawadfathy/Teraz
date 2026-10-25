import { Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/tokens';

type Variant = 'primary' | 'dark' | 'ghost' | 'danger';

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
};

const containerClass: Record<Variant, string> = {
  primary: 'bg-gold',
  dark: 'bg-ink',
  ghost: 'border border-ink/20 bg-surface',
  danger: 'border border-danger/40 bg-surface',
};

const labelClass: Record<Variant, string> = {
  primary: 'text-ink',
  dark: 'text-white',
  ghost: 'text-ink',
  danger: 'text-danger',
};

const iconColor: Record<Variant, string> = {
  primary: colors.ink,
  dark: colors.goldLight,
  ghost: colors.ink,
  danger: colors.danger,
};

// Shared UI primitive: it owns the look, the feedback and the accessibility.
// The screen only decides what happens on press.
export function AppButton({ label, onPress, variant = 'primary', disabled = false, icon }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      className={`flex-row items-center justify-center gap-2 rounded-full px-6 py-4 active:opacity-80 ${containerClass[variant]} ${
        disabled ? 'opacity-40' : ''
      }`}
    >
      {icon ? <Ionicons name={icon} size={18} color={iconColor[variant]} /> : null}
      <Text className={`text-base font-bold tracking-wide ${labelClass[variant]}`}>{label}</Text>
    </Pressable>
  );
}
