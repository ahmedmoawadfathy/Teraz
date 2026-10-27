import { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View, type TextInputInstance } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { AppButton } from '@/components/ui/AppButton';
import { AppTextInput } from '@/components/ui/AppTextInput';
import type { RootStackScreenProps } from '@/app/navigation/types';
import { colors } from '@/theme/tokens';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { useLogin } from '../hooks/useLogin';

export default function LoginScreen({ navigation, route }: RootStackScreenProps<'Login'>) {
  const justRegistered = route.params?.justRegistered ?? false;
  const { email, setEmail, password, setPassword, errors, submit } = useLogin(route.params?.email);
  const { user, setUser } = useProfile();
  const emailRef = useRef<TextInputInstance>(null);
  const passwordRef = useRef<TextInputInstance>(null);

  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
      setPassword('');
      passwordRef.current?.focus();
    }
  }, [route.params?.email]);

  function handleLogin() {
    const { errors: result, account } = submit();
    if (result.email) {
      emailRef.current?.focus();
      return;
    }
    if (result.password || !account) {
      passwordRef.current?.focus();
      return;
    }
    if (account.email.toLowerCase() !== user.email.toLowerCase()) {
      setUser({ ...user, id: account.email, fullName: account.fullName, email: account.email, phone: '', address: '', createdAt: new Date().toISOString() });
    }
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
              <Text className="font-display text-3xl text-ink">{justRegistered ? 'Welcome to Teraz' : 'Welcome back'}</Text>
              <Text className="text-muted">Sign in to continue to your wardrobe.</Text>
            </View>
            {justRegistered ? (
              <View className="flex-row items-center gap-2 rounded-2xl bg-success/10 px-4 py-3">
                <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                <Text className="flex-1 text-sm text-success">Your account is ready. Log in with your new email and password.</Text>
              </View>
            ) : null}
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
