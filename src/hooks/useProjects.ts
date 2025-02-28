import useSWR from 'swr';
import useLocalStorageState from 'use-local-storage-state';
import { fetcher } from '@/lib/fetcher';
import { useMemo } from 'react';

export interface IProjects {
  _id: string;
  protoUrl?: string;
  owner?: string;
  name: string;
  image: string | null;
  views: number;
  visit: Date | null;
  tasks?: object[];
  updatedAt: string;
}

export interface IProjectFilters {
  search?: string;
  sort?: 'name' | 'views' | 'createdAt' | 'visit';
  order?: 'asc' | 'desc';
}

export function useProjects() {
  const [filters, setFilters] = useLocalStorageState<IProjectFilters>('projectFilters', {
    defaultValue: { sort: 'createdAt', order: 'desc' },
  });

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    const { search, sort, order } = filters;

    if (search) params.append('search', search);
    if (sort) params.append('sort', sort);
    if (order) params.append('order', order);

    return params.toString();
  }, [filters]);

  const { data, error, isLoading } = useSWR<IProjects[]>(`/api/projects?${queryString}`, fetcher, {
    dedupingInterval: 3000,
    revalidateOnFocus: false,
  });

  return {
    projects: data || [],
    isLoading,
    isError: error,
    filters,
    setFilters,
  };
}
