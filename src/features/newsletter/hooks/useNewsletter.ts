import { useState } from 'react';

export function useNewsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  function subscribe() {
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }
    setError(null);
    setSubscribed(true);
  }

  function changeEmail(value: string) {
    setEmail(value);
    if (error) setError(null);
  }

  return { email, changeEmail, error, subscribed, subscribe };
}
