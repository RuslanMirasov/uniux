'use client';

import { useUser } from '@/hooks/useUser';
import { useEffect, useState, useRef } from 'react';
import { signOut } from 'next-auth/react';
import { Title, Text, Avatar, Icon, ButtonIcon, ProfileUpdateForm, Skeleton, AvatarForm } from '../../components';
import css from './Profile.module.scss';

interface Session {
  _id: string;
  name: string;
  email: string;
  image: string;
  subscribe: boolean;
}

const Profile: React.FC = () => {
  const profileRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading, error, mutate } = useUser();

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading || !user || error) {
    return (
      <div className={css.Profile}>
        <div className={css.ProfileHead}>
          <Skeleton width="28px" radius="28px" />
          <Skeleton width="150px" height="14px" radius="4px" />
        </div>
      </div>
    );
  }

  const { _id, name, email, image } = user as Session;

  return (
    <div className={css.Profile} ref={profileRef}>
      <div className={`${css.ProfileHead} ${isOpen ? css['isOpen'] : ''}`} onClick={handleOpenToggle}>
        <Avatar size="small" email={email} name={name} image={image} />
        <Title size="h6">{name ? name : email}</Title>
        <Icon name="select-arrow" size="10" />
      </div>
      <ul className={`${css.ProfileBody} ${isOpen ? css['isOpen'] : ''}`}>
        <li>
          <AvatarForm id={_id} email={email} name={name} image={image} />
          <span>
            <Text align="center">{name ? name : 'New User'}</Text>
            <Text size="small" align="center" color="grey">
              {email}
            </Text>
          </span>
        </li>
        <li>
          <ProfileUpdateForm user={user as Session} mutate={mutate} />
        </li>
        <li>
          <ButtonIcon icon="logout" onClick={() => signOut({ redirect: false })}>
            Logout
          </ButtonIcon>
          <ButtonIcon icon="close" iconSize="14" color="rgb(231, 83, 73)" onClick={() => signOut({ redirect: false })}>
            Delete
          </ButtonIcon>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
