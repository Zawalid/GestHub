import { createContext, useContext } from 'react';

export const ModalContext = createContext();

export function useConfirmationModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useConfirmationModal must be used within a ModalProvider');

  return context;
}
