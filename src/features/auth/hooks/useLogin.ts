import { useState } from 'react';
import { signIn, type Account } from '../api';

type Errors = { email?: string; password?: string };

export function useLogin(initialEmail = '') {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  function submit(): { errors: Errors; account: Account | null } {
    const next: Errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = 'Enter a valid email address.';
    if (password.length < 8) next.password = 'Password must be at least 8 characters.';

    let account: Account | null = null;
    if (Object.keys(next).length === 0) {
      account = signIn(email, password);
      if (!account) next.password = 'Email or password is incorrect.';
    }
    setErrors(next);
    return { errors: next, account };
  }

  return { email, setEmail, password, setPassword, errors, submit };
}
