'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import css from './Camera.module.scss';

interface CameraProps {
  rec?: boolean;
  stop?: boolean;
}

const Camera: React.FC<CameraProps> = ({ rec = false, stop = false }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const chunks = useRef<Blob[]>([]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
        });

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        setError('camera use is forbidden');
      }
    };

    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (!error && rec) {
      startRecording();
    }
  }, [rec, error]);

  useEffect(() => {
    if (!error && stop) {
      stopRecording();
    }
  }, [stop, error]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (videoURL) {
        URL.revokeObjectURL(videoURL);
      }
    };
  }, [videoURL]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const startRecording = () => {
    if (!streamRef.current) return;

    chunks.current = [];
    const recorder = new MediaRecorder(streamRef.current, { mimeType: 'video/webm' });

    recorder.ondataavailable = event => {
      if (event.data.size > 0) {
        chunks.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: 'video/webm' });
      setVideoURL(URL.createObjectURL(blob));
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

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
