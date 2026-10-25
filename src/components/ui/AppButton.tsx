import { Pressable, Text } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost' | 'danger';
  disabled?: boolean;
};

const containerClass = {
  primary: 'bg-ink',
  ghost: 'border border-ink bg-transparent',
  danger: 'border border-danger bg-transparent',
} as const;

const labelClass = {
  primary: 'text-white',
  ghost: 'text-ink',
  danger: 'text-danger',
} as const;

// Shared UI primitive: it owns the look, the feedback and the accessibility.
// The screen only decides what happens on press.
export function AppButton({ label, onPress, variant = 'primary', disabled = false }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      className={`items-center rounded-xl px-5 py-4 active:opacity-70 ${containerClass[variant]} ${disabled ? 'opacity-40' : ''}`}
    >
      <Text className={`text-base font-semibold ${labelClass[variant]}`}>{label}</Text>
    </Pressable>
  );
}
