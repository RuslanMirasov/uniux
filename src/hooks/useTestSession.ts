import useLocalStorageState from 'use-local-storage-state';
import { fetcher } from '@/lib/fetcher';
import { useState, useEffect, useCallback } from 'react';
import { ISessionState, IClick } from '@/models/Session';

const initTestSession: ISessionState = {
  project: null,
  status: null,
  video: null,
  clicks: [],
  user: { name: null, email: null, image: null },
  task: { _id: null, device: 'app', taskName: null, protoUrl: null, description: null },
};

export const useTestSession = () => {
  const [cameraVideo, setCameraVideo] = useState<File | Blob | null>(null);
  const [testSession, setTestSession] = useLocalStorageState<ISessionState>('testSession', {
    defaultValue: initTestSession,
  });

  const updateTestSession = useCallback(
    (updates: Partial<ISessionState>) => {
      setTestSession(prev => ({ ...prev, ...updates }));
    },
    [setTestSession]
  );

  const saveSessionData = useCallback(
    async (file: File | Blob | null) => {
      if (!file) return;

      try {
        const formData = new FormData();
        formData.append('video', file);
        formData.append('session', JSON.stringify(testSession));

        const response = await fetcher<{ ok: boolean; message?: string }>('/api/sessions', {
          method: 'POST',
          data: formData,
          isFormData: true,
        });

        console.log('✅ Video saved: ', response);
      } catch (error) {
        console.error('❌ Session save error:', error);
      } finally {
        updateTestSession({ status: null });
        setCameraVideo(null);
      }
    },
    [testSession, updateTestSession]
  );

  useEffect(() => {
    if (cameraVideo) {
      saveSessionData(cameraVideo);
    }
  }, [cameraVideo, saveSessionData]);

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
    cameraVideo,
    setCameraVideo,
    testSession,
    updateTestSession,
    clearTestSession,
    addNewClickToSession,
    saveSessionData,
  };
};
