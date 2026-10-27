import { useState } from 'react';
import { updateProfile, validateProfile } from '../api';
import { useProfile } from './useProfile';

export function useEditProfile() {
  const { user, setUser } = useProfile();
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [errors, setErrors] = useState<ReturnType<typeof validateProfile>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function save() {
    const next = validateProfile({ fullName, email, phone, address });
    setErrors(next);
    if (Object.keys(next).length > 0) return false;

    setSaving(true);
    setSaveError(null);
    try {
      const updated = await updateProfile({
        ...user,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
      });
      setUser(updated);
      return true;
    } catch {
      setSaveError('Your changes could not be saved. Please try again.');
      return false;
    } finally {
      setSaving(false);
    }
  }

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    address,
    setAddress,
    errors,
    saving,
    saveError,
    save,
  };
}
