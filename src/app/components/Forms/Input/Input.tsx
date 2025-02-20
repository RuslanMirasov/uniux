'use client';

import { InputError } from '../..';
import { InputProps } from './type';
import css from '../Forms.module.scss';

const Input: React.FC<InputProps> = ({ placeholder, type, label, register, error, disabled, value }) => {
  return (
    <div className={css.InputWrapper}>
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        className={error ? css.Invalid : ''}
        disabled={disabled}
        value={value}
        id={register.name}
      />
      {label && (
        <label htmlFor={register.name}>
          <span>{label}</span>
        </label>
      )}
      {error && <InputError text={error} />}
    </div>
  );
};

export default Input;
