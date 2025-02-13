import type { JSX } from 'react';
import css from './Title.module.scss';

interface TitleProps {
  tag?: keyof JSX.IntrinsicElements;
  size: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  auto?: boolean;
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ tag = 'strong', size, auto = false, children }) => {
  const Tag = tag;

  return <Tag className={`${css.Title} ${css[size]} ${auto && css.Auto}`}>{children}</Tag>;
};

export default Title;
