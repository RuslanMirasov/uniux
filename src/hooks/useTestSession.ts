import useLocalStorageState from 'use-local-storage-state';
import { useCallback } from 'react';
import { ISessionState, IClick } from '@/models/session';

const initTestSession: ISessionState = {
  project: null,
  status: 'fail',
  video: null,
  clicks: [],
  user: { name: null, email: null, image: null },
  task: { _id: null, device: 'app', taskName: null, protoUrl: null, description: null },
};

export const useTestSession = () => {
  const [testSession, setTestSession] = useLocalStorageState<ISessionState>('testSession', {
    defaultValue: initTestSession,
  });

  const updateTestSession = useCallback(
    (updates: Partial<ISessionState>) => {
      setTestSession(prev => ({ ...prev, ...updates }));
    },
    [setTestSession]
  );

  const addNewClickToSession = useCallback(
    (newClick: IClick) => {
      setTestSession(prev => ({ ...prev, clicks: [...prev.clicks, newClick] }));
    },
    [setTestSession]
  );

  const clearTestSession = useCallback(() => {
    setTestSession(initTestSession);
  }, [setTestSession]);

  return {
    testSession,
    updateTestSession,
    clearTestSession,
    addNewClickToSession,
  };
};
