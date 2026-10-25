import { useState, type PropsWithChildren } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/tokens';

type Props = PropsWithChildren<{
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  initiallyOpen?: boolean;
}>;

// Collapsible section: tap the title to show or hide its content.
export function Accordion({ title, icon, initiallyOpen = false, children }: Props) {
  const [open, setOpen] = useState(initiallyOpen);

  return (
    <View className="overflow-hidden rounded-3xl bg-surface">
      <Pressable
        onPress={() => setOpen(!open)}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        className="flex-row items-center gap-3 px-5 py-4 active:bg-cream"
      >
        {icon ? <Ionicons name={icon} size={18} color={colors.gold} /> : null}
        <Text className="flex-1 font-display text-lg text-ink">{title}</Text>
        <Ionicons name={open ? 'remove' : 'add'} size={20} color={colors.ink} />
      </Pressable>
      {open ? <View className="gap-3 px-5 pb-5">{children}</View> : null}
    </View>
  );
}
