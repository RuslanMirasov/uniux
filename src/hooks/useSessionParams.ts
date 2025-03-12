'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export const useSessionParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (task: string | null, status: string | null) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (task) newParams.set('task', task);
    if (status) newParams.set('status', status);
    router.push(`?${newParams.toString()}`, { scroll: false });
  };
};
