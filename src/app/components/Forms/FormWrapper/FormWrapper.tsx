import css from './FormWrapper.module.scss';

interface FormWrapperProps {
  children: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children }) => {
  return <div className={css.FormWrapper}>{children}</div>;
};

export default FormWrapper;
