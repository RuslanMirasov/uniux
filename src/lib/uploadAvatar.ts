import { storage } from '@/lib/firebase';
import { fetcher } from '@/lib/fetcher';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { optimizeImage } from './optimizeImage';

export const uploadAvatar = async (file: File, id: string) => {
  const compressedFile = await optimizeImage(file);
  const storageRef = ref(storage, `avatars/avatar_${id}.webp`);
  await uploadBytes(storageRef, compressedFile);
  const downloadURL = await getDownloadURL(storageRef);

  await fetcher('/api/auth/profile', {
    method: 'PATCH',
    data: { image: downloadURL },
  });
};
