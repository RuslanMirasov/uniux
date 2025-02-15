'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '../../../components';

const GoogleButton: React.FC = () => {
  const searchParams = useSearchParams();
  const [callbackUrl, setCallbackUrl] = useState('/');

  useEffect(() => {
    const url = searchParams.get('callbackUrl') || '/';
    setCallbackUrl(url);
  }, [searchParams]);

  return (
    <Button variant="border" full icon="google" onClick={() => signIn('google', { callbackUrl, redirect: false })}>
      Continue with Google
    </Button>
  );
};

export default GoogleButton;
