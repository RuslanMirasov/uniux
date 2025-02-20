import Image from 'next/image';
import { avatarSignature } from '@/lib/avatarSignature';
import css from './Avatar.module.scss';

interface AvatarProps {
  email: string;
  size?: 'normal' | 'small';
  image?: string | null;
  name?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ image, name, email, size = 'normal' }) => {
  return (
    <div className={`${css.Avatar} ${css[size]}`}>
      {image ? (
        <Image src={image} width="156" height="156" alt="Uniux avatar" />
      ) : (
        <span>{avatarSignature(name ? name : email)}</span>
      )}
    </div>
  );
};

export default Avatar;
