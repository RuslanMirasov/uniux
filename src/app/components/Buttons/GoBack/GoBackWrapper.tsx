import css from './GoBack.module.scss';

interface GoBackWrapperProps {
  children: React.ReactNode;
}

const GoBackWrapper: React.FC<GoBackWrapperProps> = ({ children }) => {
  return <div className={css.GoBackWrapper}>{children}</div>;
};

export default GoBackWrapper;
