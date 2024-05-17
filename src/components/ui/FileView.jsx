import { useState } from 'react';
import { Button, Modal, Status } from '.';
import { MdOutlineFullscreen, MdOutlineFullscreenExit } from 'react-icons/md';

export function FileView({ isOpen, onClose, file }) {
  const [isFullScreen, setIsFullScreen] = useState(document.fullscreenElement);
  const [isError, setIsError] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      className={`relative ${isFullScreen ? 'h-full w-full' : 'min-h-[470px] sm:h-fit md:max-h-[600px] md:w-[650px] md:border '}`}
      closeOnBlur={true}
      closeButton={false}
      onClose={onClose}
    >
      <Button onClick={() => setIsFullScreen(!isFullScreen)} shape='icon' className='absolute bottom-1 left-1 z-10'>
        {isFullScreen ? <MdOutlineFullscreenExit size={20} /> : <MdOutlineFullscreen size={20} />}
      </Button>
      {isError && (
        <Status
          status='error'
          heading='Oops, something went wrong!'
          message="We're having trouble loading the file. Please check your connection and try again."
        />
      )}
     {isOpen &&  <object key={file} data={file} type='application/pdf' className='flex-1' onLoad={() => setIsError(false)}>
        <link rel='stylesheet' href={file} onError={(e) => setIsError(e.type === 'error')} />
      </object>}
    </Modal>
  );
}
