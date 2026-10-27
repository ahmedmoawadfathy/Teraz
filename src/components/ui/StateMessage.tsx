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

export function StateMessage({ type, title, message, icon, actionLabel, onAction }: Props) {
  if (type === 'loading') {
    return (
      <View className="flex-1 items-center justify-center gap-3 bg-cream p-8">
        <ActivityIndicator color={colors.gold} size="large" />
        <Text className="text-muted">{message ?? 'Loading…'}</Text>
      </View>
    );
  }

  const isError = type === 'error';

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-cream px-8 py-12">
      <View className={`h-20 w-20 items-center justify-center rounded-full ${isError ? 'bg-danger/10' : 'bg-gold/15'}`}>
        <Ionicons
          name={icon ?? (isError ? 'alert-circle-outline' : 'file-tray-outline')}
          size={36}
          color={isError ? colors.danger : colors.gold}
        />
      </View>
      {title ? <Text className="text-center font-display text-2xl text-ink">{title}</Text> : null}
      {message ? <Text className="text-center leading-6 text-muted">{message}</Text> : null}
      {actionLabel && onAction ? (
        <View className="mt-2 w-full">
          <AppButton label={actionLabel} onPress={onAction} variant="dark" />
        </View>
      ) : null}
    </View>
  );
}
