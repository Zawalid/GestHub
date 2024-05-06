import { useState } from "react";
import { Button, Modal } from ".";
import { MdOutlineFullscreen, MdOutlineFullscreenExit } from "react-icons/md";

export  function FileView({isOpen,onClose,file}) {
    const [isFullScreen, setIsFullScreen] = useState(document.fullscreenElement);

  return (
    <Modal
    isOpen={isOpen}
    className={`relative md:border ${isFullScreen ? 'h-full w-full' : 'min-h-[470px] sm:h-fit md:max-h-[600px] md:w-[650px]'}`}
    closeOnBlur={true}
    closeButton={false}
    onClose={onClose}
  >
    <Button onClick={() => setIsFullScreen(!isFullScreen)} shape='icon'
    className='absolute bottom-1 left-1'
    >
      {isFullScreen ? <MdOutlineFullscreenExit size={20} /> : <MdOutlineFullscreen size={20} />}
    </Button>
    <object data={file} type='application/pdf' className='flex-1'></object>
  </Modal>  )
}
