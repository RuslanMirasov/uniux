import { storage } from '@/lib/firebase';
import { fetcher } from '@/lib/fetcher';
import { ref, uploadBytes, getDownloadURL, getMetadata, deleteObject } from 'firebase/storage';
import { optimizeImage } from './optimizeImage';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

interface FirebaseToken {
  token: string;
}

const authenticateWithFirebase = async (id: string) => {
  const auth = getAuth();
  const { token } = await fetcher<FirebaseToken>(`/api/auth/firebase?id=${id}`);
  await signInWithCustomToken(auth, token);
  if (!auth.currentUser) throw new Error('Firebase authentication failed');

  return auth.currentUser ? auth : null;
};

export const uploadAvatar = async (file: File, id: string) => {
  const auth = await authenticateWithFirebase(id);
  if (!auth) return;

  const compressedFile = await optimizeImage(file);
  const storageRef = ref(storage, `avatars/avatar_${id}.webp`);
  await uploadBytes(storageRef, compressedFile);
  const downloadURL = await getDownloadURL(storageRef);

  await fetcher('/api/auth/profile', {
    method: 'PATCH',
    data: { image: downloadURL },
  });
};

export const deleteAvatar = async (id: string) => {
  const auth = await authenticateWithFirebase(id);
  if (!auth) return;

  const storageRef = ref(storage, `avatars/avatar_${id}.webp`);
  const fileExists = await getMetadata(storageRef)
    .then(() => true)
    .catch(() => false);

  if (!fileExists) return;

  await deleteObject(storageRef);
};
