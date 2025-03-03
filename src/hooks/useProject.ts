import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export interface IProject {
  _id: string;
  name: string;
  tasks: object[];
}

export function useProject(projectId: string) {
  const { data, error, isLoading, mutate } = useSWR<IProject>(`/api/projects/${projectId}`, fetcher);

  return {
    project: data,
    isLoading,
    isError: !!error,
    mutate,
  };
}
