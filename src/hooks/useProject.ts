import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export interface IProject {
  _id: string;
  protoUrl?: string;
  owner?: string;
  name: string;
  image: string | null;
  tasks?: object[];
  updatedAt: string;
}

export function useProject() {
  const { data, error, isLoading } = useSWR<IProject[]>('/api/project', fetcher);

  return {
    projects: data || [],
    isLoading,
    isError: error,
  };
}
