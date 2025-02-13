'use client';

import { useSession } from 'next-auth/react';
import { avatarSignature } from '@/lib/avatarSignature';
import Image from 'next/image';
import { Title, LogoutButton } from '../../components';
import css from './Profile.module.scss';

const Profile: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === 'loading' || !session?.user)
    return (
      <div className={css.Profile}>
        <div className={css.Avatar}>
          <span>??</span>
        </div>
        <Title size="h6">Loading...</Title>
      </div>
    );

  const name = session.user.name || null;
  const email = session.user.email || '';
  const image = session.user.image || null;

  return (
    <>
      <div className={css.Profile}>
        <div className={css.Avatar}>
          {image ? (
            <Image src={image} width="56" height="56" alt="Uniux avatar" />
          ) : (
            <span>{avatarSignature(name ? name : email)}</span>
          )}
        </div>
        <Title size="h6">{name ? name : email}</Title>
      </div>
      <LogoutButton />
    </>
  );
};

export default Profile;
