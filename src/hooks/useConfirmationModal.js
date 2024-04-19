import { useContext } from 'react';
import { ModalContext } from '@/context/ConfirmationModal';

export function useConfirmationModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useConfirmationModal must be used within a ModalProvider');

  return context;
}
