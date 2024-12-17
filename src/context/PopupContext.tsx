'use client';

import React, { createContext, useState, ReactNode } from 'react';

interface PopupContextProps {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
}

const PopupContext = createContext<PopupContextProps | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return <PopupContext.Provider value={{ isOpen, openPopup, closePopup }}>{children}</PopupContext.Provider>;
};

export default PopupContext;
