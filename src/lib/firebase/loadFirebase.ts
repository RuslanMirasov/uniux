export const loadFirebase = async () => {
  const { ref, uploadBytes, getDownloadURL, getMetadata, deleteObject } = await import('firebase/storage');
  const { storage } = await import('@/lib/firebase/firebase');
  return { storage, ref, uploadBytes, getDownloadURL, getMetadata, deleteObject };
};
