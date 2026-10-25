import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { AppButton } from '@/components/ui/AppButton';
import { AppTextInput } from '@/components/ui/AppTextInput';
import type { RootStackScreenProps } from '@/app/navigation/types';
import { useRegister } from '../hooks/useRegister';

export default function RegisterScreen({ navigation }: RootStackScreenProps<'Register'>) {
  const form = useRegister();

  function handleRegister() {
    if (form.submit()) navigation.replace('Main', { screen: 'Home' });
  }

  return (
    <KeyboardAvoidingView className="flex-1 bg-cream" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerClassName="gap-5 px-6 pb-12 pt-2" keyboardShouldPersistTaps="handled">
        <View className="gap-2">
          <Text className="text-xs font-bold uppercase tracking-widest text-gold">Join Teraz</Text>
          <Text className="font-display text-4xl text-ink">Create your account</Text>
          <Text className="leading-6 text-muted">Save favourites, get styling picks and track every order.</Text>
        </View>

        <View className="gap-4 rounded-[28px] bg-surface p-5 shadow-sm">
          <AppTextInput
            label="Full name"
            icon="person-outline"
            value={form.fullName}
            onChangeText={form.setFullName}
            placeholder="Your name"
            error={form.errors.fullName}
          />
          <AppTextInput
            label="Email"
            icon="mail-outline"
            value={form.email}
            onChangeText={form.setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={form.errors.email}
          />
          <AppTextInput
            label="Password"
            icon="lock-closed-outline"
            value={form.password}
            onChangeText={form.setPassword}
            placeholder="At least 8 characters"
            secureTextEntry
            error={form.errors.password}
          />
          <AppTextInput
            label="Confirm password"
            icon="shield-checkmark-outline"
            value={form.confirmPassword}
            onChangeText={form.setConfirmPassword}
            placeholder="Type it again"
            secureTextEntry
            error={form.errors.confirmPassword}
          />
        </View>

        <AppButton label="Create account" onPress={handleRegister} icon="arrow-forward" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
