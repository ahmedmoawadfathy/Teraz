import { useRef } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View, type TextInputInstance } from 'react-native';
import { AppButton } from '@/components/ui/AppButton';
import { AppTextInput } from '@/components/ui/AppTextInput';
import type { RootStackScreenProps } from '@/app/navigation/types';
import { useLogin } from '../hooks/useLogin';

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
  const { email, setEmail, password, setPassword, errors, submit } = useLogin();
  const emailRef = useRef<TextInputInstance>(null);
  const passwordRef = useRef<TextInputInstance>(null);

  function handleLogin() {
    const result = submit();
    if (result.email) {
      emailRef.current?.focus();
      return;
    }
    if (result.password) {
      passwordRef.current?.focus();
      return;
    }
    // replace: Back must not return to the login screen.
    navigation.replace('Main', { screen: 'Home' });
  }

  return (
    <KeyboardAvoidingView className="flex-1 bg-cream" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerClassName="flex-grow justify-center gap-8 px-6 py-12" keyboardShouldPersistTaps="handled">
        <View className="items-center gap-2">
          <Text className="text-4xl font-bold tracking-widest text-ink">TERAZ</Text>
          <Text className="text-xs font-semibold uppercase tracking-widest text-gold">Ties · Belts · Styling</Text>
        </View>

        <View className="gap-4 rounded-2xl bg-surface p-5">
          <Text className="text-2xl font-bold text-ink">Welcome back</Text>
          <AppTextInput
            ref={emailRef}
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={errors.email}
          />
          <AppTextInput
            ref={passwordRef}
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="At least 8 characters"
            secureTextEntry
            error={errors.password}
          />
          <AppButton label="Log in" onPress={handleLogin} />
        </View>

        <Pressable
          onPress={() => navigation.navigate('Register')}
          accessibilityRole="button"
          className="items-center active:opacity-70"
        >
          <Text className="text-muted">
            New to Teraz? <Text className="font-semibold text-ink">Create an account</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
