'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useTestSession } from '@/hooks/useTestSession';
import css from './Camera.module.scss';

interface CameraProps {
  rec?: boolean;
}

const Camera: React.FC<CameraProps> = ({ rec = false }) => {
  const { setCameraVideo } = useTestSession();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [error, setError] = useState<string | null>(null);

  /* Включение камеры */
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: 110,
          height: 150,
          frameRate: { min: 15, ideal: 20, max: 22 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      setError('Camera use is forbidden');
    }
  }, []);

  /* Остановка камеры */
  const stopCamera = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  /* Начать запись */
  const startRecording = useCallback(() => {
    if (!streamRef.current) return;

    chunksRef.current = [];
    const mimeType = 'video/webm; codecs=vp9';

    const options = {
      mimeType,
      videoBitsPerSecond: 150000, // Максимальное сжатие (150 Кбит/с)
    };

    const recorder = new MediaRecorder(streamRef.current, options);

    recorder.ondataavailable = event => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };

    recorder.onstop = () => {
      if (chunksRef.current.length === 0) return;

      const blob = new Blob(chunksRef.current, { type: mimeType });
      const file = new File([blob], `session_${Date.now()}.webm`, { type: mimeType });

      setCameraVideo(file);
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
  }, [setCameraVideo]);

  useEffect(() => {
    if (rec) {
      startRecording();
    } else {
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stop();
        stopCamera();
      }
    }
  }, [rec, startRecording, stopCamera]);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  return (
    <div className={css.Camera}>
      {error ? (
        <p className={css.error}>{error}</p>
      ) : (
        <video ref={videoRef} autoPlay playsInline className={css.video} />
      )}
      {!error && rec && <span className={css.Rec}>REC</span>}
    </div>
  );
};

export default Camera;
