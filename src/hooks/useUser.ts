'use client';

import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

interface User {
  email: string;
  handle?: string | null;
  img_url?: string | null;
  figmaId?: string | null;
  authType?: 'local' | 'figma';
  subscribe?: boolean;
}

export const useUser = () => {
  const { data, error, isLoading, mutate } = useSWR<User | null>('/api/auth/me', fetcher);

  return {
    user: data ?? null,
    isLoading,
    isError: !!error,
    mutate,
  };
};
