import css from './Title.module.scss';

const Title = ({ tag, size, auto = false, children }) => {
  const Tag = tag || 'div';

  return <Tag className={`${css.Title} ${css[size]} ${auto && css.Auto}`}>{children}</Tag>;
};

export default Title;
