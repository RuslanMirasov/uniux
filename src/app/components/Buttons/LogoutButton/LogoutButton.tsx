'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { usePopup } from '@/hooks/usePopup';
import { Icon } from '../../../components';
import css from './LogoutButton.module.scss';

const LogoutButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { openPopup } = usePopup();
  const router = useRouter();

  const logout = async () => {
    setIsLoading(true);

    try {
      await signOut({ redirect: false });
      router.push('/login');
    } catch {
      openPopup({
        type: 'error',
        title: 'Logout failed',
        subtitle: 'An unexpected error occurred.',
        icon: 'error',
        btn: 'Close',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button type="button" className={css.LogoutButton} onClick={logout} aria-label="Log out" disabled={isLoading}>
      <Icon name="logout" size="16" />
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
