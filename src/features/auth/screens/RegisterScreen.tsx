import { KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
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
      <ScrollView contentContainerClassName="gap-4 p-6" keyboardShouldPersistTaps="handled">
        <Text className="text-muted">Create an account to save favourites and track your orders.</Text>
        <AppTextInput
          label="Full name"
          value={form.fullName}
          onChangeText={form.setFullName}
          placeholder="Your name"
          error={form.errors.fullName}
        />
        <AppTextInput
          label="Email"
          value={form.email}
          onChangeText={form.setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          error={form.errors.email}
        />
        <AppTextInput
          label="Password"
          value={form.password}
          onChangeText={form.setPassword}
          placeholder="At least 8 characters"
          secureTextEntry
          error={form.errors.password}
        />
        <AppTextInput
          label="Confirm password"
          value={form.confirmPassword}
          onChangeText={form.setConfirmPassword}
          placeholder="Type it again"
          secureTextEntry
          error={form.errors.confirmPassword}
        />
        <AppButton label="Create account" onPress={handleRegister} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
