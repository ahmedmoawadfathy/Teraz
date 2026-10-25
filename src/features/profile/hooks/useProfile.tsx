import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import { DEMO_USER } from '../api';
import type { User } from '../types';

type ProfileValue = {
  user: User;
  setUser: (user: User) => void;
};

const ProfileContext = createContext<ProfileValue | null>(null);

export function ProfileProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User>(DEMO_USER);
  return <ProfileContext.Provider value={{ user, setUser }}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const value = useContext(ProfileContext);
  if (!value) throw new Error('useProfile must be inside ProfileProvider');
  return value;
}
