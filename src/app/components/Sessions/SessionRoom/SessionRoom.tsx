'use client';
import { useState, useEffect } from 'react';
import { useSessionParams } from '@/hooks/useSessionParams';
import { getFileKey } from '@/lib/figma/getFileKey';
import { Logo, SessionStopButton, Device } from '../../../components';
import { useSearchParams } from 'next/navigation';
import css from './SessionRoom.module.scss';

interface SessionRoomProps {
  prototype: string | null;
  target: string | null;
}

const SessionRoom: React.FC<SessionRoomProps> = ({ prototype = null, target = null }) => {
  const searchParams = useSearchParams();
  const setSessionParams = useSessionParams();
  const [isTaskStarted, setIsTaskStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin.includes('figma.com') && event.data.type === 'PRESENTED_NODE_CHANGED') {
        if (!isTaskStarted) {
          setIsTaskStarted(true);
          setIsLoading(false);
          return;
        }
        const iframe = document.querySelector('iframe');
        if (!iframe) return;

        const fileKey = getFileKey(iframe.src);
        const nodeId = event.data.data.presentedNodeId;

        if (!fileKey || !nodeId) return;

        try {
          setIsLoading(true);
          const res = await fetch(`/api/figma?fileKey=${fileKey}&nodeId=${nodeId}`);
          const data = await res.json();

          if (res.ok && data.name.includes('uniux')) {
            if (data.name === target) {
              setSessionParams(`${searchParams.get('task')}`, 'done');
            } else {
              setSessionParams(`${searchParams.get('task')}`, 'fail');
            }
          }
        } catch (error) {
          console.error('Request failed:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [isTaskStarted, searchParams, setSessionParams, target]);

  return (
    <>
      <Logo position="right" />
      <div className={css.SessionRoom}>
        <Device url={prototype} loading={isLoading} />
      </div>
      {isTaskStarted && <SessionStopButton onClick={() => setSessionParams(`${searchParams.get('task')}`, 'fail')} />}
    </>
  );
};

export default SessionRoom;
