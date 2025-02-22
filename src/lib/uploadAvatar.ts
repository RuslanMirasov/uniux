import { storage } from '@/lib/firebase';
import { fetcher } from '@/lib/fetcher';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { optimizeImage } from './optimizeImage';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

interface FirebaseToken {
  token: string;
}

export const uploadAvatar = async (file: File, id: string) => {
  const auth = getAuth();

  const { token } = await fetcher<FirebaseToken>(`/api/auth/firebase?id=${id}`);

  await signInWithCustomToken(auth, token);

  if (!auth.currentUser) {
    throw new Error('Firebase authentication failed');
  }

  const compressedFile = await optimizeImage(file);
  const storageRef = ref(storage, `avatars/avatar_${id}.webp`);
  await uploadBytes(storageRef, compressedFile);
  const downloadURL = await getDownloadURL(storageRef);

  await fetcher('/api/auth/profile', {
    method: 'PATCH',
    data: { image: downloadURL },
  });
};
