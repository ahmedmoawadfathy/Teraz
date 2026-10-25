import type { User } from './types';

export const DEMO_USER: User = {
  id: 'u1',
  fullName: 'Ahmed Moawad',
  email: 'ahmed@example.com',
  phone: '01001234567',
  address: '12 Nile Street, Cairo',
  createdAt: '2026-09-01T09:00:00.000Z',
};

// Phase 1: pretend to save and return the updated user.
export async function updateProfile(user: User): Promise<User> {
  return user;
}

export function validateProfile(values: Pick<User, 'fullName' | 'email' | 'phone' | 'address'>) {
  const errors: Partial<Record<keyof typeof values, string>> = {};
  if (!values.fullName.trim()) errors.fullName = 'Name is required.';
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (!/^01[0-9]{9}$/.test(values.phone.trim())) errors.phone = 'Enter an 11-digit mobile number starting with 01.';
  if (!values.address.trim()) errors.address = 'Address is required.';
  return errors;
}
