import type { Ref } from 'react';
import { Text, TextInput, View, type TextInputInstance, type TextInputProps } from 'react-native';

type Props = TextInputProps & {
  label: string;
  error?: string;
  ref?: Ref<TextInputInstance>;
};

// Labelled text field that shows its validation error underneath.
export function AppTextInput({ label, error, ref, ...inputProps }: Props) {
  return (
    <View className="gap-1.5">
      <Text className="text-sm font-semibold text-ink">{label}</Text>
      <TextInput
        ref={ref}
        placeholderTextColor="#9CA3AF"
        accessibilityLabel={label}
        className={`rounded-xl border bg-surface px-4 py-3 text-base text-ink ${error ? 'border-danger' : 'border-line'}`}
        {...inputProps}
      />
      {error ? <Text className="text-sm text-danger">{error}</Text> : null}
    </View>
  );
}
