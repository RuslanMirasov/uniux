'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';
import { Icon } from '../../components';
import css from './Accordeon.module.scss';

interface AccordeonProps {
  locked?: boolean;
  href?: string;
  number?: number;
  title: string;
  open?: boolean;
  children: ReactNode;
}

const Accordeon: React.FC<AccordeonProps> = ({ locked = false, href = '/', number, title, open = false, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOpenToggle = () => {
    if (locked) {
      router.push(href);
      return;
    }

    setIsOpen(prev => !prev);
  };

  const accordeonClasses: string = [css.Accordeon, isOpen ? css.Open : '', locked ? css.Locked : ''].join(' ');

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
          <Icon name={locked ? 'accordeon-play' : 'accordeon-arrow'} />
        </button>
      </div>
      {!locked && (
        <div className={css.AccordeonBody}>
          <div className={css.AccordeonBodyContent}>{children}</div>
        </div>
      )}
    </div>
  );
};

export default Accordeon;
