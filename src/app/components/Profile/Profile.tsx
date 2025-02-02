'use client';

import { useAuth } from '@/hooks/useAuth';
import { mutate } from 'swr';
import { avatarSignature } from '@/lib/avatarSignature';
import Image from 'next/image';
import { useEffect } from 'react';
import { Preloader, Title, LogoutForm } from '../../components';
import css from './Profile.module.scss';

const Profile: React.FC = () => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    mutate('/api/auth/me');
  }, []);

  if (isLoading) return <Preloader />;
  if (!user) return null;

  const { handle: name, email, img_url } = user;

  return (
    <>
      <div className={css.Profile}>
        <div className={css.Avatar}>
          {img_url ? (
            <Image src={img_url} width="56" height="56" alt="Uniux avatar" />
          ) : (
            <span>{avatarSignature(name ? name : email)}</span>
          )}
        </div>
        <Title size="h6">{name ? name : email}</Title>
      </div>
      <LogoutForm />
    </>
  );
};

export default Profile;
