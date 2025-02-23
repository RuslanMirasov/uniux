'use client';

import { createContext, useState, ReactNode, useEffect } from 'react';
import { bodyLock, bodyUnlock } from '../lib/popup';

export interface PopupParams {
  type?: 'error' | 'success' | 'message' | 'confirm';
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  btn?: string;
  icon?: string;
  locked?: boolean;
  action?: () => void;
}

export interface PopupContextProps {
  isOpen: boolean;
  isVisible: boolean;
  params: Partial<PopupParams>;
  openPopup: (params: PopupParams) => void;
  refreshPopup: (params: PopupParams) => void;
  closePopup: () => void;
}

const PopupContext = createContext<PopupContextProps | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [params, setParams] = useState<Partial<PopupParams>>({});

  // Close Popup by Esc
  useEffect(() => {
    if (!isOpen || params.locked) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, params.locked]);

  const openPopup = (newParams: PopupParams) => {
    bodyLock();
    setParams({ ...newParams });
    setIsOpen(true);
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  };

  const refreshPopup = (newParams: PopupParams) => {
    setIsVisible(false);
    setTimeout(() => {
      setParams({ ...newParams });
    }, 350);
    setTimeout(() => {
      setIsVisible(true);
    }, 400);
  };

  const closePopup = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      setParams({});
      bodyUnlock();
    }, 400);
  };

  return (
    <PopupContext.Provider value={{ isOpen, isVisible, params, openPopup, closePopup, refreshPopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export default PopupContext;
