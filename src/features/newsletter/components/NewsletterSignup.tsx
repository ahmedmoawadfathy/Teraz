import { Pressable, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/tokens';
import { useNewsletter } from '../hooks/useNewsletter';

// Email sign-up for news and exclusive offers.
export function NewsletterSignup() {
  const { email, changeEmail, error, subscribed, subscribe } = useNewsletter();

  return (
    <View className="gap-4 rounded-[28px] bg-sand p-6">
      <View className="h-12 w-12 items-center justify-center rounded-full bg-ink">
        <Ionicons name="mail-open-outline" size={22} color={colors.goldLight} />
      </View>
      <View className="gap-1">
        <Text className="font-display text-2xl text-ink">Join the Teraz circle</Text>
        <Text className="leading-6 text-ink/70">First look at new collections and exclusive offers, straight to your inbox.</Text>
      </View>

      {subscribed ? (
        <View className="flex-row items-center gap-3 rounded-2xl bg-surface px-4 py-4">
          <Ionicons name="checkmark-circle" size={22} color={colors.success} />
          <Text className="flex-1 font-semibold text-ink">You're on the list. Welcome to Teraz!</Text>
        </View>
      ) : (
        <View className="gap-2">
          <View
            className={`flex-row items-center rounded-full border bg-surface pl-5 pr-1.5 ${error ? 'border-danger' : 'border-line'}`}
          >
            <TextInput
              value={email}
              onChangeText={changeEmail}
              placeholder="Your email address"
              placeholderTextColor="#A3A7B0"
              keyboardType="email-address"
              autoCapitalize="none"
              accessibilityLabel="Email for newsletter"
              onSubmitEditing={subscribe}
              className="min-w-0 flex-1 py-3.5 text-base text-ink"
              style={{ minWidth: 0 }}
            />
            <Pressable
              onPress={subscribe}
              accessibilityRole="button"
              className="rounded-full bg-ink px-5 py-3 active:opacity-80"
            >
              <Text className="font-bold text-goldLight">Sign up</Text>
            </Pressable>
          </View>
          {error ? (
            <View className="flex-row items-center gap-1.5 pl-2">
              <Ionicons name="alert-circle" size={14} color={colors.danger} />
              <Text className="text-sm text-danger">{error}</Text>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
}
