import { ReactNode } from 'react';
import css from './StartProjectButton.module.scss';

interface StartProjectButtonProps {
  children: ReactNode;
}

const StartProjectButton: React.FC<StartProjectButtonProps> = ({ children }) => (
  <div className={css.StartProjectButton}>{children}</div>
);
export default StartProjectButton;
