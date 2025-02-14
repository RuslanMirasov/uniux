'use client';

import { useMemo } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '../../../components';

const GoogleButton: React.FC = () => {
  const callbackUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      return url.searchParams.get('callbackUrl') || '/';
    }
    return '/';
  }, []);

  return (
    <Button variant="border" full icon="google" onClick={() => signIn('google', { callbackUrl, redirect: false })}>
      Continue with Google
    </Button>
  );
};

export default GoogleButton;
