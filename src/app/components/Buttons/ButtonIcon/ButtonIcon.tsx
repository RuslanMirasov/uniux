'use client';

import { ReactNode, useState } from 'react';
import { Icon } from '../../../components';
import css from './ButtonIcon.module.scss';

interface ButtonIconProps {
  children: ReactNode | string;
  icon: string;
  color?: string;
  iconSize?: string;
  onClick: () => void;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ children, icon, iconSize = '20', color = 'inherit', onClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      style={{ color: color }}
      className={`${css.ButtonIcon} ${isLoading ? css.Loading : ''}`}
      onClick={handleClick}
      disabled={isLoading}
    >
      <Icon name={icon} size={iconSize} />
      <span>{children}</span>
    </button>
  );
};

export default ButtonIcon;
