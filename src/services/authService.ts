import { signIn } from 'next-auth/react';
import { fetcher } from '@/lib/fetcher';

interface RegisterData {
  email: string;
  password: string;
  subscribe?: boolean;
}

export const registerUser = async (data: RegisterData) => {
  return fetcher('/api/register', { method: 'POST', data: { ...data } });
};

export const loginUser = async (email: string, password: string) => {
  return signIn('credentials', {
    redirect: false,
    email,
    password,
  });
};
