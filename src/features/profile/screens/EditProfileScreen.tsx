import { useRef } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, type TextInputInstance } from 'react-native';
import { AppButton } from '@/components/ui/AppButton';
import { AppTextInput } from '@/components/ui/AppTextInput';
import type { RootStackScreenProps } from '@/app/navigation/types';
import { useEditProfile } from '../hooks/useEditProfile';

export default function EditProfileScreen({ navigation }: RootStackScreenProps<'EditProfile'>) {
  const form = useEditProfile();
  const nameRef = useRef<TextInputInstance>(null);

  async function handleSave() {
    const saved = await form.save();
    if (saved) navigation.goBack();
    else if (!form.fullName.trim()) nameRef.current?.focus();
  }

  return (
    <KeyboardAvoidingView className="flex-1 bg-cream" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerClassName="gap-4 p-4 pb-10" keyboardShouldPersistTaps="handled">
        <AppTextInput
          ref={nameRef}
          label="Full name"
          value={form.fullName}
          onChangeText={form.setFullName}
          error={form.errors.fullName}
        />
        <AppTextInput
          label="Email"
          value={form.email}
          onChangeText={form.setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={form.errors.email}
        />
        <AppTextInput
          label="Mobile number"
          value={form.phone}
          onChangeText={form.setPhone}
          keyboardType="phone-pad"
          maxLength={11}
          error={form.errors.phone}
        />
        <AppTextInput
          label="Address"
          value={form.address}
          onChangeText={form.setAddress}
          multiline
          error={form.errors.address}
        />
        {form.saveError ? <Text className="text-danger">{form.saveError}</Text> : null}
        <AppButton label={form.saving ? 'Saving…' : 'Save changes'} onPress={handleSave} disabled={form.saving} />
        <AppButton label="Cancel" variant="ghost" onPress={() => navigation.goBack()} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
