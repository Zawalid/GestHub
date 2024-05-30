import {  useCallback, useState } from 'react';
import { PiWarningFill } from 'react-icons/pi';
import { Modal, Button } from '@/components/ui';
import { ModalContext } from '@/hooks/useConfirmationModal';

const DEFAULT_OPTIONS = {
  message: '',
  title: '',
  confirmText: '',
  icon: '',
  iconBg: '',
  buttonClassName: '',
};

export function ConfirmationModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  const openModal = (newOptions) => {
    setIsModalOpen(true);
    setOptions({ ...options, ...newOptions });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOptions(DEFAULT_OPTIONS);
  };
  const onConfirm = useCallback(() => {
    options.onConfirm();
    closeModal();
  }, [options]);
  const onCancel = () => {
    options.onCancel?.();
    closeModal();
  };

  return (
    <ModalContext.Provider
      value={{
        options,
        openModal,
        isModalOpen,
      }}
    >
      {children}
      <Modal
        isOpen={isModalOpen}
        className='h-fit w-fit max-w-[90%] flex-col gap-5 rounded-xl border  py-3 shadow-sm child-padding sm:max-w-[460px] sm:py-4'
        overlayClassName='z-50'
        closeOnBlur={false}
      >
        <div className='flex items-center gap-3  pb-3'>
          <div
            className={`grid h-6 w-6 place-content-center rounded-full text-white sm:h-8 sm:w-8 sm:text-lg ${options.iconBg || 'bg-[#F57800]'}`}
          >
            {options.icon || <PiWarningFill />}
          </div>
          <h1 className='text-xl font-semibold text-text-primary sm:text-2xl'>{options.title}</h1>
        </div>
        <p className='text-sm text-text-secondary sm:text-base'>{options.message}</p>

        <div className='mt-3 flex  items-center justify-end gap-3 border-t border-border pt-3'>
          <Button color='tertiary' onClick={onCancel}>
            Cancel
          </Button>
          <Button className={options.buttonClassName} onClick={onConfirm} color={options.color || 'red'}>
            {options.confirmText || 'Delete'}
          </Button>
        </div>
      </Modal>
    </ModalContext.Provider>
  );
}
