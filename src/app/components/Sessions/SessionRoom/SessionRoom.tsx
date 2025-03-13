'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSessionParams } from '@/hooks/useSessionParams';
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
  const setSessionParams = useSessionParams();
  const { updateTestSession, addNewClickToSession } = useTestSession();
  const [isTaskStarted, setIsTaskStarted] = useState(false);
  const [rec, setRec] = useState(false);
  const [stopRecord, setStopRecord] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const saveResult = useCallback(
    (result: string) => {
      if (result !== 'done' && result !== 'fail') return;
      setRec(false);
      setStopRecord(true);
      updateTestSession({ status: result });
      setSessionParams(`${searchParams.get('task')}`, result);
    },
    [searchParams, setSessionParams, updateTestSession]
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
        if (!isTaskStarted) {
          setIsTaskStarted(true);
          setIsLoading(false);
          setRec(false);
          setStartTime(new Date().getTime());
          return;
        }
      }

      if (event.data.type === 'MOUSE_PRESS_OR_RELEASE') {
        saveClick(event.data.data);
      }

      if (event.data.type === 'PRESENTED_NODE_CHANGED') {
        if (!isTaskStarted) return;

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
  }, [isTaskStarted, searchParams, setSessionParams, target, saveClick, saveResult]);

  return (
    <>
      <Logo position="right" />
      <Camera rec={rec} stop={stopRecord} />
      <div className={css.SessionRoom}>
        <Device url={prototype} loading={isLoading} />
      </div>
      {isTaskStarted && <SessionStopButton onClick={() => saveResult('fail')} />}
    </>
  );
};

export default SessionRoom;
