import { useState } from 'react';
import { Modal, Status } from '.';
import { useFullScreen } from '@/hooks/useFullScreen';

export function FileView({ isOpen, onClose, file }) {
  const { element, isFullScreen, toggler } = useFullScreen();
  const [isError, setIsError] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      className={`relative ${isFullScreen ? 'h-full w-full' : 'min-h-[470px] sm:h-fit md:max-h-[600px] md:w-[650px] md:border '}`}
      closeOnBlur={true}
      closeButton={false}
      onClose={onClose}
      ref={element}
    >
      {toggler}
      {isError && (
        <Status
          status='error'
          heading='Oops, something went wrong!'
          message="We're having trouble loading the file. Please check your connection and try again."
        />
      )}
      {isOpen && (
        <object key={file} data={file} type='application/pdf' className='flex-1' onLoad={() => setIsError(false)}>
          <link rel='stylesheet' href={file} onError={(e) => setIsError(e.type === 'error')} />
        </object>
      )}
    </Modal>
  );
}
