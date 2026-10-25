import { useState } from 'react';

// Newsletter sign-up: validates the email and remembers that the customer subscribed.
// Phase 1 keeps it on the device; Phase 2 sends it to the database.
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
