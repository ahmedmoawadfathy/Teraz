import { Pressable, Text, View } from 'react-native';

type Props = {
  title: string;
  eyebrow?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function SectionHeader({ title, eyebrow, actionLabel, onAction }: Props) {
  return (
    <View className="flex-row items-end justify-between">
      <View className="gap-1">
        {eyebrow ? <Text className="text-xs font-bold uppercase tracking-widest text-gold">{eyebrow}</Text> : null}
        <Text className="font-display text-2xl text-ink">{title}</Text>
      </View>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} accessibilityRole="button" hitSlop={8} className="active:opacity-60">
          <Text className="font-semibold text-gold">{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
