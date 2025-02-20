'use client';
import { useEffect, useRef, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Preloader from '../Preloader/Preloader';
import { usePopup } from '@/hooks/usePopup';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const { openPopup, closePopup } = usePopup();
  const router = useRouter();
  const pathname = usePathname();
  const hasShownPopup = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showSessionError = useCallback(() => {
    if (!hasShownPopup.current) {
      hasShownPopup.current = true;
      openPopup({
        locked: true,
        type: 'error',
        icon: 'timer',
        title: 'Session expired',
        subtitle: 'Sign in to your account using login form or "Continue with Google" button',
        btn: 'Sign in',
        action: () => {
          closePopup();
          setTimeout(() => signOut(), 300);
        },
      });
    }
  }, [openPopup, closePopup]);

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    if (session?.expires) {
      const timeLeft = new Date(session.expires).getTime() - Date.now();

      if (timeLeft <= 0) {
        showSessionError();
      } else if (timeLeft <= 300000) {
        timeoutRef.current = setTimeout(showSessionError, timeLeft);
        return () => clearTimeout(timeoutRef.current as NodeJS.Timeout);
      }
    }
  }, [status, session, showSessionError, router, pathname]);

  if (status === 'loading' || status === 'unauthenticated') {
    return <Preloader />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
