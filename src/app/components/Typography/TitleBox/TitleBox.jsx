import css from './TitleBox.module.scss';

const TitleBox = ({ align, children, className }) => {
  return (
    <div style={align && { textAlign: align }} className={`${css.TitleBox} ${className}`}>
      {children}
    </div>
  );
};

export default TitleBox;
