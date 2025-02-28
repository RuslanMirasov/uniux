import useSWR from 'swr';
import useLocalStorageState from 'use-local-storage-state';
import { fetcher } from '@/lib/fetcher';

export interface IProject {
  _id: string;
  name: string;
  tasks: object[];
}

export function useProject(projectId: string) {
  const [cachedProject, setCachedProject] = useLocalStorageState<IProject | null>('current-project', {
    defaultValue: null,
  });

  const { data, error, isLoading, mutate } = useSWR<IProject>(`/api/projects/${projectId}`, fetcher, {
    onSuccess: fetchedProject => {
      setCachedProject(fetchedProject);
    },
  });

  return {
    project: cachedProject || data,
    isLoading,
    isError: !!error,
    mutate,
  };
}
