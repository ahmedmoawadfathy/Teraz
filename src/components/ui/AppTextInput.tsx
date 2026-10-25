import type { Ref } from 'react';
import { Text, TextInput, View, type TextInputInstance, type TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/tokens';

type Props = TextInputProps & {
  label: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  ref?: Ref<TextInputInstance>;
};

// Labelled text field with an optional icon; shows its validation error underneath.
export function AppTextInput({ label, error, icon, ref, multiline, ...inputProps }: Props) {
  return (
    <View className="gap-2">
      <Text className="text-xs font-bold uppercase tracking-widest text-muted">{label}</Text>
      <View
        className={`flex-row gap-3 rounded-2xl border bg-surface px-4 ${multiline ? 'items-start py-3' : 'items-center'} ${
          error ? 'border-danger' : 'border-line'
        }`}
      >
        {icon ? <Ionicons name={icon} size={18} color={error ? colors.danger : colors.gold} /> : null}
        <TextInput
          ref={ref}
          multiline={multiline}
          placeholderTextColor="#A3A7B0"
          accessibilityLabel={label}
          className={`flex-1 text-base text-ink ${multiline ? 'min-h-12' : 'py-3.5'}`}
          {...inputProps}
        />
      </View>
      {error ? (
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="alert-circle" size={14} color={colors.danger} />
          <Text className="text-sm text-danger">{error}</Text>
        </View>
      ) : null}
    </View>
  );
}
