'use client';
import { useState, useEffect, useCallback } from 'react';
// import { useSessionParams } from '@/hooks/useSessionParams';
import { useTestSession } from '@/hooks/useTestSession';
import { getFileKey } from '@/lib/figma/getFileKey';
import { Logo, SessionStopButton, Device, Camera } from '../../../components';
import { useSearchParams } from 'next/navigation';
import type { IClick } from '@/models/Session';
import css from './SessionRoom.module.scss';

interface SessionRoomProps {
  prototype: string | null;
  target: string | null;
}

interface MouseEventData {
  nearestScrollingFrameMousePosition: { x: number; y: number };
  nearestScrollingFrameOffset: { y: number };
}

const SessionRoom: React.FC<SessionRoomProps> = ({ prototype = null, target = null }) => {
  const searchParams = useSearchParams();
  // const setSessionParams = useSessionParams();
  const { updateTestSession, addNewClickToSession } = useTestSession();
  const [rec, setRec] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const saveResult = useCallback(
    (result: string) => {
      if (result !== 'done' && result !== 'fail') return;
      updateTestSession({ status: result });
      setRec(false);
      // setSessionParams(`${searchParams.get('task')}`, result);
    },
    [setRec, searchParams, updateTestSession]
  );

  const saveClick = useCallback(
    (data: MouseEventData) => {
      const { nearestScrollingFrameMousePosition, nearestScrollingFrameOffset } = data;
      const dateNow = new Date().getTime();
      const newClick: IClick = {
        time: dateNow - startTime,
        x: Math.round(nearestScrollingFrameMousePosition.x),
        y: Math.round(nearestScrollingFrameMousePosition.y),
        scroll: Math.round(nearestScrollingFrameOffset.y),
      };
      addNewClickToSession(newClick);
    },
    [startTime, addNewClickToSession]
  );

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (!event.origin.includes('figma.com')) return;

      if (event.data.type === 'INITIAL_LOAD') {
        setIsLoading(false);
        setStartTime(new Date().getTime());
        setRec(true);
        return;
      }

      if (event.data.type === 'MOUSE_PRESS_OR_RELEASE') {
        saveClick(event.data.data);
      }

      if (event.data.type === 'PRESENTED_NODE_CHANGED') {
        if (!rec) return;

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
            saveResult(data.name === target ? 'done' : 'fail');
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
  }, [target, saveClick, saveResult, rec]);

  return (
    <>
      <Logo position="right" />
      <Camera rec={rec} />
      <div className={css.SessionRoom}>
        <Device url={prototype} loading={isLoading} />
      </div>
      {rec && <SessionStopButton onClick={() => saveResult('fail')} />}
    </>
  );
};

export default SessionRoom;
