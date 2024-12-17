'use client';

import { usePopup } from '@/hooks/usePopup';
import { Button } from './../../components';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import clsx from 'clsx';
import css from './Popup.module.scss';

const Popup = ({ type = 'error' }) => {
  const { isOpen, closePopup } = usePopup();

  if (!isOpen || !type) return null;

  const PopupClasses = clsx(css.Popup, css[`popup--${type}`]);

  return (
    <div className={css.Backdrop} onClick={closePopup}>
      <div className={PopupClasses} onClick={e => e.stopPropagation()}>
        <CloseButton onClick={closePopup} />
        <h2>Title</h2>
        <p>Subtitle</p>
        <Button type="button" variant="white" full onClick={closePopup}>
          Ок
        </Button>
      </div>
    </div>
  );
};

export default Popup;
