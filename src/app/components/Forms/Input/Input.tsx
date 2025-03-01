'use client';

import { InputError } from '../..';
import { InputProps } from './type';
import { useId } from 'react';
import css from '../Forms.module.scss';

const Input: React.FC<InputProps> = ({ placeholder, type, label, register, error, disabled, value }) => {
  const inputId = useId();

  if (type === 'hidden') return <input {...register} type={type} value={value} id={inputId} />;

  return (
    <div className={css.InputWrapper}>
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        className={error ? css.Invalid : ''}
        disabled={disabled}
        value={value}
        id={inputId}
      />
      {label && (
        <label htmlFor={inputId}>
          <span>{label}</span>
        </label>
      )}
      {error && <InputError text={error} />}
    </div>
  );
};

export default Input;
