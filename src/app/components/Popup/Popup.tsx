'use client';

import { usePopup } from '@/hooks/usePopup';
import { Button, Icon } from './../../components';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import clsx from 'clsx';
import css from './Popup.module.scss';

const Popup = () => {
  const { isOpen, isVisible, params, closePopup } = usePopup();

  if (!isOpen || !params) return null;

  const { type, title, subtitle, btn, icon, action = closePopup } = params;
  const PopupClasses = clsx(css.Popup, css[`popup--${type}`], { [css.Visible]: isVisible });

  return (
    <div className={`${css.Backdrop} ${isVisible ? css.Visible : ''}`} onClick={closePopup}>
      <div className={PopupClasses} onClick={e => e.stopPropagation()}>
        <CloseButton onClick={closePopup} />
        <div className={css.Content}>
          {title && (
            <h2 className={css.Title}>
              {icon ? <Icon name={icon} /> : ''}
              {title}
            </h2>
          )}
          {subtitle && <p className={css.Subtitle}>{subtitle}</p>}
          {btn && (
            <Button type="button" variant={type === 'error' ? 'black' : 'default'} full onClick={action}>
              {btn}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
