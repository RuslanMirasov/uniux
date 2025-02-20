'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState, useRef } from 'react';
import { signOut } from 'next-auth/react';
import { Title, Text, Avatar, Icon, ButtonIcon, ProfileUpdateForm } from '../../components';
import css from './Profile.module.scss';

interface Session {
  name: string;
  email: string;
  image: string;
  subscribe: boolean;
}

const Profile: React.FC = () => {
  const { data: session, status } = useSession();
  const profileRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

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

  if (status === 'loading' || !session?.user) return null;

  const { name, email, image } = session.user as Session;

  return (
    <div className={css.Profile} ref={profileRef}>
      <div className={`${css.ProfileHead} ${isOpen ? css['isOpen'] : ''}`} onClick={handleOpenToggle}>
        <Avatar size="small" email={email} name={name} image={image} />
        <Title size="h6">{name ? name : email}</Title>
        <Icon name="select-arrow" size="10" />
      </div>
      <ul className={`${css.ProfileBody} ${isOpen ? css['isOpen'] : ''}`}>
        <li>
          <div className={css.AvatarForm}>
            <Avatar email={email} name={name} image={image} />
            <div className={css.AvatarFormIcon}>
              <Icon name="pen" size="10" />
            </div>
          </div>
          <span>
            <Text align="center">{name ? name : 'New User'}</Text>
            <Text size="small" align="center" color="grey">
              {email}
            </Text>
          </span>
        </li>
        <li>
          <ProfileUpdateForm session={session.user as Session} />
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
