'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetcher } from '@/lib/fetcher';
import { Button } from '../..';

import { usePopup } from '@/hooks/usePopup';

interface FetchError extends Error {
  status?: number;
  message: string;
}

const LogoutForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { openPopup } = usePopup();
  const router = useRouter();

  const logout = async () => {
    setIsLoading(true);

    try {
      await fetcher('/api/auth/logout', { method: 'GET' });
      await router.push('/login');
    } catch (error) {
      const err = error as FetchError;
      openPopup({
        type: 'error',
        title: `Error ${err?.status || ''}`,
        subtitle: err?.message || 'An unexpected error occurred.',
        icon: 'error',
        btn: 'Close',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button type="submit" variant="white" size="small" isLoading={isLoading} onClick={logout}>
      Log out
    </Button>
  );
};

export default LogoutForm;
