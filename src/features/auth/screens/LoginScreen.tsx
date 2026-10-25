import { useRef } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View, type TextInputInstance } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { AppButton } from '@/components/ui/AppButton';
import { AppTextInput } from '@/components/ui/AppTextInput';
import type { RootStackScreenProps } from '@/app/navigation/types';
import { colors } from '@/theme/tokens';
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
    <LinearGradient colors={[colors.ink, colors.navy]} style={{ flex: 1 }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerClassName="flex-grow justify-center gap-8 px-6 py-14" keyboardShouldPersistTaps="handled">
          <View className="items-center gap-4">
            <Image
              source={require('../../../../assets/teraz-logo.png')}
              style={{ width: 260, height: 60 }}
              resizeMode="contain"
              accessibilityLabel="Teraz"
            />
            <View className="flex-row items-center gap-3">
              <View className="h-px w-8 bg-goldLight/50" />
              <Text className="text-xs font-semibold uppercase tracking-[4px] text-goldLight">Ties · Belts · Styling</Text>
              <View className="h-px w-8 bg-goldLight/50" />
            </View>
          </View>

          <View className="gap-5 rounded-[32px] bg-cream p-6">
            <View className="gap-1">
              <Text className="font-display text-3xl text-ink">Welcome back</Text>
              <Text className="text-muted">Sign in to continue to your wardrobe.</Text>
            </View>
            <AppTextInput
              ref={emailRef}
              label="Email"
              icon="mail-outline"
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
              icon="lock-closed-outline"
              value={password}
              onChangeText={setPassword}
              placeholder="At least 8 characters"
              secureTextEntry
              error={errors.password}
            />
            <AppButton label="Log in" onPress={handleLogin} icon="arrow-forward" />
          </View>

          <Pressable
            onPress={() => navigation.navigate('Register')}
            accessibilityRole="button"
            className="items-center active:opacity-70"
          >
            <Text className="text-slate-300">
              New to Teraz? <Text className="font-bold text-goldLight">Create an account</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
