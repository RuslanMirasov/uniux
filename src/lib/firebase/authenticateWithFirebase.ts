import { fetcher } from '@/lib/fetcher';

interface FirebaseToken {
  token: string;
}

export const authenticateWithFirebase = async (id: string) => {
  const { getAuth, signInWithCustomToken } = await import('firebase/auth');
  const { firebaseApp } = await import('@/lib/firebase/firebase');
  const auth = getAuth(firebaseApp);
  const { token } = await fetcher<FirebaseToken>(`/api/auth/firebase?id=${id}`);
  await signInWithCustomToken(auth, token);

  if (!auth.currentUser) throw new Error('Firebase authentication failed');
  return auth.currentUser ? auth : null;
};
