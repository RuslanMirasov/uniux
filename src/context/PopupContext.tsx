'use client';

import { createContext, useState, ReactNode } from 'react';
import { bodyLock, bodyUnlock } from '../lib/popup';

export interface PopupParams {
  type?: 'error' | 'success' | 'message';
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  btn?: string;
  icon?: string;
  action?: () => void;
}

export interface PopupContextProps {
  isOpen: boolean;
  isVisible: boolean;
  params: Partial<PopupParams>;
  openPopup: (params: PopupParams) => void;
  closePopup: () => void;
}

const PopupContext = createContext<PopupContextProps | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [params, setParams] = useState<Partial<PopupParams>>({});

  const openPopup = (params: PopupParams) => {
    bodyLock();
    setParams({ ...params });
    setIsOpen(true);
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  };

  const closePopup = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      setParams({});
      bodyUnlock();
    }, 600);
  };

  return (
    <PopupContext.Provider value={{ isOpen, isVisible, params, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export default PopupContext;
