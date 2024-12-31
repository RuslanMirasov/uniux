import { useAuth } from '@/hooks/useAuth';
import { avatarSignature } from '@/lib/avatarSignature';
import Image from 'next/image';
import { Preloader, Title } from '../../components';
import css from './Profile.module.scss';

const Profile: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Preloader />;
  if (!user) return null;

  const { handle: name, email, img_url } = user;

  return (
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
  );
};

export default Profile;
