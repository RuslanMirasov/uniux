import { loadFirebase } from '@/lib/firebase/loadFirebase';
import { storageAdmin } from '@/lib/firebase/admin';

export const uploadVideo = async (file: File) => {
  const fileBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);

  const { storage, ref, uploadBytes } = await loadFirebase();

  const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  const filePath = `sessions/session_${Date.now()}.webm`;

  const storageRef = ref(storage, filePath);

  await uploadBytes(storageRef, buffer, { contentType: 'video/webm' });

  const newVideo = storageAdmin.file(filePath);
  await newVideo.makePublic();

  return `https://storage.googleapis.com/${bucketName}/${filePath}`;
};
