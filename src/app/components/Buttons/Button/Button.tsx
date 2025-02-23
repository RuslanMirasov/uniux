'use client';

import { Icon } from '../../../components';
import Link from 'next/link';
import clsx from 'clsx';
import css from './Button.module.scss';

interface ButtonPropsType {
  variant?: 'default' | 'white' | 'red' | 'border' | 'black';
  href?: string;
  type?: 'submit' | 'button' | 'reset';
  size?: 'normal' | 'small';
  full?: boolean;
  target?: '_self' | '_blank';
  disabled?: boolean;
  isLoading?: boolean;
  icon?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonPropsType> = ({
  href,
  onClick,
  type = 'submit',
  variant = 'default',
  size = 'normal',
  full = false,
  target = '_self',
  disabled = false,
  isLoading = false,
  icon,
  children,
}) => {
  const buttonClasses = clsx(css.Button, css[`button--${variant}`], css[`size--${size}`], {
    [css.Full]: full,
    [css.Loading]: isLoading,
  });

  const buttonElement = href ? (
    <Link href={href} className={buttonClasses} target={target}>
      {icon && <Icon name={icon} />}
      <span>{children}</span>
    </Link>
  ) : (
    <button type={type} onClick={onClick} className={buttonClasses} disabled={disabled}>
      {icon && <Icon name={icon} />}
      <span>{children}</span>
    </button>
  );

  return buttonElement;
};

export default Button;
