'use client';

import { useUser } from '@/hooks/useUser';
import { useState, useRef } from 'react';
import { signOut } from 'next-auth/react';
import { Title, Text, Avatar, Icon, ButtonIcon, ProfileUpdateForm, Skeleton, AvatarForm } from '../../components';
import css from './Profile.module.scss';
import { fetcher } from '@/lib/fetcher';
import { usePopup } from '@/hooks/usePopup';

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
  const { openPopup, closePopup } = usePopup();

  const handleDeleteAccaunt = async (id: string) => {
    openPopup({
      type: 'confirm',
      icon: 'question',
      title: 'Are you sure you want to delete your account?',
      subtitle: 'This action is irreversible, and all your data will be permanently lost.',
      btn: 'Yes',
      action: async () => {
        const { deleteAvatar } = await import('@/lib/uploadAvatar');
        await deleteAvatar(id);
        await fetcher(`/api/auth/profile`, {
          method: 'DELETE',
        });
        closePopup();
        signOut({ redirect: false });
      },
    });
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
      <div className={`${css.ProfileHead} ${isOpen ? css['isOpen'] : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <Avatar size="small" email={email} name={name} image={image} />
        <Title size="h6">{name ? name : email}</Title>
        <Icon name="select-arrow" size="10" />
      </div>
      {isOpen && (
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
            <ButtonIcon icon="close" iconSize="14" color="#e75349" onClick={() => handleDeleteAccaunt(_id)}>
              Delete
            </ButtonIcon>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Profile;
