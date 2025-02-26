import useSWR from 'swr';
import useLocalStorageState from 'use-local-storage-state';
import { fetcher } from '@/lib/fetcher';
import { useMemo } from 'react';

export interface IProject {
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

export function useProject() {
  const [filters, setFilters] = useLocalStorageState<IProjectFilters>('projectFilters', {
    defaultValue: { sort: 'createdAt', order: 'desc' },
  });

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.sort) params.append('sort', filters.sort);
    if (filters.order) params.append('order', filters.order);
    return params.toString();
  }, [filters]);

  const { data, error, isLoading } = useSWR<IProject[]>(`/api/project?${queryString}`, fetcher);

  return {
    projects: data || [],
    isLoading,
    isError: error,
    filters,
    setFilters,
  };
}
