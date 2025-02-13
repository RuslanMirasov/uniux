'use client';

import { signIn } from 'next-auth/react';
import { Button } from '../../../components';
import { useSearchParams } from 'next/navigation';

const GoogleButton: React.FC = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <Button variant="border" full icon="google" onClick={() => signIn('google', { callbackUrl, redirect: false })}>
      Continue with Google
    </Button>
  );
};

export default GoogleButton;
