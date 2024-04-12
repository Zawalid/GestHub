import { ModalContext } from '@/context/ConfirmationModal';
import { useContext } from 'react';

export function useConfirmationModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
