import css from './Logo.module.scss';
import Icon from 'components/Icon/Icon';
import { Link } from 'components/Links';

const Logo = ({ position = 'left' }) => {
  return (
    <Link to="/" className={`${css.Logo} ${css[position]}`}>
      <Icon name="logo" />
    </Link>
  );
};

export default Logo;
