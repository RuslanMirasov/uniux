import { UseFormRegisterReturn } from 'react-hook-form';

export interface InputProps {
  type: string;
  placeholder?: string;
  label?: string;
  value?: string;
  register: UseFormRegisterReturn;
  error?: string | undefined;
  disabled?: boolean;
}
