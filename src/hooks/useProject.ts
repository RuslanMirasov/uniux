import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

interface Task {
  _id: string;
  taskName: string;
  description: string;
  device: string;
  protoUrl: string;
  target: string;
}

export interface IProject {
  _id: string;
  name: string;
  tasks: Task[];
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
