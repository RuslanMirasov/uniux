'use client';

import { useEffect, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Preloader from '../Preloader/Preloader';
import { usePopup } from '@/hooks/usePopup';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const { openPopup } = usePopup();
  const router = useRouter();
  const pathname = usePathname();

  const showSessionError = useCallback(() => {
    openPopup({
      type: 'error',
      icon: 'timer',
      title: 'Session expired',
      subtitle: 'Sign in to your account using login form or "Continue with Google" button',
      btn: 'Sign in',
      locked: true,
      action: () => signOut(),
    });
  }, [openPopup]);

  //Redirect to login
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [status, router, pathname]);

  // Session token watch
  useEffect(() => {
    if (session?.expires) {
      const expirationTime = new Date(session.expires).getTime();
      const currentTime = Date.now();
      const timeLeft = expirationTime - currentTime;
      const warningThreshold = 5 * 60 * 1000;

      if (timeLeft <= 0) {
        showSessionError();
      } else if (timeLeft <= warningThreshold) {
        const timeout = setTimeout(() => {
          showSessionError();
        }, timeLeft);

        return () => clearTimeout(timeout);
      }
    }
  }, [session, showSessionError]);

  if (status === 'loading' || status === 'unauthenticated') {
    return <Preloader />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
