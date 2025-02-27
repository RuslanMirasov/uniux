'use client';
import { useState } from 'react';
import { usePopup } from '@/hooks/usePopup';
import { Button, Icon, ButtonsList } from './../../components';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import clsx from 'clsx';
import css from './Popup.module.scss';

const Popup = () => {
  const { isOpen, isVisible, params, closePopup } = usePopup();
  const [isAction, setIsAction] = useState(false);

  const handleClick = async (action: () => void) => {
    setIsAction(true);
    try {
      await action();
    } finally {
      setIsAction(false);
    }
  };

  if (!isOpen || !params) return null;

  const { type, title, subtitle, btn, icon, locked, action = closePopup } = params;
  const PopupClasses = clsx(css.Popup, css[`popup--${type}`], { [css.Visible]: isVisible });

  return (
    <div className={`${css.Backdrop} ${isVisible ? css.Visible : ''}`} onClick={!locked ? closePopup : undefined}>
      <div className={PopupClasses} onClick={e => e.stopPropagation()}>
        {!locked && <CloseButton onClick={closePopup} />}
        <div className={css.Content}>
          {title && (
            <h2 className={css.Title}>
              {icon ? <Icon name={icon} /> : ''}
              {title}
            </h2>
          )}
          {subtitle && <p className={css.Subtitle}>{subtitle}</p>}
          {btn && (
            <ButtonsList align="center">
              <Button
                type="button"
                variant={type === 'error' ? 'black' : 'default'}
                full={type === 'confirm' ? false : true}
                isLoading={isAction}
                onClick={() => handleClick(action)}
              >
                {btn}
              </Button>
              {type === 'confirm' && (
                <Button type="button" variant="white" onClick={closePopup}>
                  No
                </Button>
              )}
            </ButtonsList>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
