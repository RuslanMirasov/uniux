import css from './GoBack.module.scss';

const GoBackWrapper = ({ children }) => {
  return <div className={css.GoBackWrapper}>{children}</div>;
};

export default GoBackWrapper;
