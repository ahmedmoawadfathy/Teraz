import { ActivityIndicator, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/tokens';
import { AppButton } from './AppButton';

type Props = {
  type: 'loading' | 'empty' | 'error';
  title?: string;
  message?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  actionLabel?: string;
  onAction?: () => void;
};

// One component for the loading, empty and error states of every screen.
export function StateMessage({ type, title, message, icon, actionLabel, onAction }: Props) {
  if (type === 'loading') {
    return (
      <View className="flex-1 items-center justify-center gap-3 p-8">
        <ActivityIndicator color={colors.ink} />
        <Text className="text-muted">{message ?? 'Loading…'}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center gap-3 p-8">
      <Ionicons
        name={icon ?? (type === 'error' ? 'alert-circle-outline' : 'file-tray-outline')}
        size={44}
        color={type === 'error' ? colors.danger : colors.muted}
      />
      {title ? <Text className="text-center text-lg font-bold text-ink">{title}</Text> : null}
      {message ? <Text className="text-center text-muted">{message}</Text> : null}
      {actionLabel && onAction ? (
        <View className="mt-2 w-full">
          <AppButton label={actionLabel} onPress={onAction} variant="ghost" />
        </View>
      ) : null}
    </View>
  );
}
