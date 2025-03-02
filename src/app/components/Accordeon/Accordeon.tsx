'use client';

import { useEffect, useState, ReactNode } from 'react';
import { Icon } from '../../components';
import css from './Accordeon.module.scss';

interface AccordeonProps {
  number?: number;
  title: string;
  open?: boolean;
  children: ReactNode;
}

const Accordeon: React.FC<AccordeonProps> = ({ number, title, open = false, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOpenToggle = () => {
    setIsOpen(prev => !prev);
  };

  const accordeonClasses: string = [css.Accordeon, isOpen ? css.Open : ''].join(' ');

  return (
    <div className={accordeonClasses}>
      <div className={css.AccordeonHead} onClick={handleOpenToggle}>
        <strong>
          <Icon name="accordeon" />
          <span>
            {number ? `${number}. ` : ''}
            {title}
          </span>
        </strong>
        <button className={css.Arrow}>
          <Icon name="accordeon-arrow" />
        </button>
      </div>
      <div className={css.AccordeonBody}>
        <div className={css.AccordeonBodyContent}>{children}</div>
      </div>
    </div>
  );
};

export default Accordeon;
