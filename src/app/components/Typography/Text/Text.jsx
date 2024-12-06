import css from './Text.module.scss';

const Text = ({ size, color, upper, align, children }) => {
  const textClasses = `
  ${css.Text} ${align ? css[align] : ''} 
  ${size ? css[size] : ''} 
  ${color ? css[color] : ''} 
  ${upper ? css['upper'] : ''}
  `.trim();

  return <p className={textClasses}>{children}</p>;
};

export default Text;
