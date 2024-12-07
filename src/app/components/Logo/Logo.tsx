import css from './Logo.module.scss';
import { Icon } from '../../components';
import Link from 'next/link';

interface LogoProps {
  position?: 'left' | 'right';
}

const Logo = ({ position = 'left' }: LogoProps) => {
  return (
    <Link href="/" className={`${css.Logo} ${css[position]}`}>
      <Icon name="logo" />
    </Link>
  );
};

export default Logo;
