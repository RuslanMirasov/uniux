'use client';

import { createContext } from 'react';
import { useUser } from '../hooks/useUser';

interface User {
  email: string;
  handle?: string | null;
  img_url?: string | null;
  figmaId?: string | null;
  authType?: 'local' | 'figma';
  subscribe?: boolean;
}

interface AuthContextProps {
  user: User | null;
  isLogin: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUser();
  const isLogin = !!user;

  return <AuthContext.Provider value={{ user, isLogin, isLoading }}>{children}</AuthContext.Provider>;
};
