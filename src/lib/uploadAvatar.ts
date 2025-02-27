import { fetcher } from '@/lib/fetcher';
import { optimizeImage } from './optimizeImage';

interface FirebaseToken {
  token: string;
}

const loadFirebase = async () => {
  const { ref, uploadBytes, getDownloadURL, getMetadata, deleteObject } = await import('firebase/storage');
  const { storage } = await import('@/lib/firebase');
  return { storage, ref, uploadBytes, getDownloadURL, getMetadata, deleteObject };
};

const loadAuth = async () => {
  const { getAuth, signInWithCustomToken } = await import('firebase/auth');
  const { firebaseApp } = await import('@/lib/firebase');
  return { getAuth, signInWithCustomToken, firebaseApp };
};

const authenticateWithFirebase = async (id: string) => {
  const { getAuth, signInWithCustomToken, firebaseApp } = await loadAuth();
  const auth = getAuth(firebaseApp);
  const { token } = await fetcher<FirebaseToken>(`/api/auth/firebase?id=${id}`);
  await signInWithCustomToken(auth, token);

  if (!auth.currentUser) throw new Error('Firebase authentication failed');
  return auth.currentUser ? auth : null;
};

export const uploadAvatar = async (file: File, id: string) => {
  const auth = await authenticateWithFirebase(id);
  if (!auth) return;

  const compressedFile = await optimizeImage(file);
  const { storage, ref, uploadBytes, getDownloadURL } = await loadFirebase();
  const storageRef = ref(storage, `avatars/avatar_${id}.webp`);

  await uploadBytes(storageRef, compressedFile);
  const downloadURL = await getDownloadURL(storageRef);

  await fetcher('/api/auth/profile', {
    method: 'PATCH',
    data: { image: downloadURL },
  });
};

export const deleteAvatar = async (id: string) => {
  const { storage, ref, getMetadata, deleteObject } = await loadFirebase();
  const storageRef = ref(storage, `avatars/avatar_${id}.webp`);

  const fileExists = await getMetadata(storageRef)
    .then(() => true)
    .catch(() => false);

  if (!fileExists) return;

  const auth = await authenticateWithFirebase(id);
  if (!auth) return;

  await deleteObject(storageRef);
};
