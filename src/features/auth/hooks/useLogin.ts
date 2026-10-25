import { useState } from 'react';

type Errors = { email?: string; password?: string };

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  // Phase 1 checks the form only; real sign-in is added with the database.
  // Returns the errors so the screen can focus the first field to fix.
  function submit() {
    const next: Errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = 'Enter a valid email address.';
    if (password.length < 8) next.password = 'Password must be at least 8 characters.';
    setErrors(next);
    return next;
  }

  return { email, setEmail, password, setPassword, errors, submit };
}
