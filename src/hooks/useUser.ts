import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export function useUser() {
  const { data, error, mutate } = useSWR('/api/auth/profile', fetcher, {
    revalidateOnFocus: false,
  });

  return {
    user: data,
    isLoading: !error && !data,
    error: error,
    mutate,
  };
}
