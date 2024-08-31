import { Button } from '@/components/ui';
import { useRef, useState } from 'react';
import { MdOutlineFullscreen, MdOutlineFullscreenExit } from 'react-icons/md';

export function useFullScreen({ size } = {}) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const element = useRef();

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (element.current.requestFullscreen) {
        element.current.requestFullscreen();
      } else if (element.current.mozRequestFullScreen) {
        element.current.mozRequestFullScreen();
      } else if (element.current.webkitRequestFullscreen) {
        element.current.webkitRequestFullscreen();
      } else if (element.current.msRequestFullscreen) {
        element.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  return {
    element,
    isFullScreen,
    toggleFullScreen,

    toggler: (
      <Button onClick={toggleFullScreen} size={size} shape='icon' className='absolute bottom-1 right-1 z-10'>
        {isFullScreen ? <MdOutlineFullscreenExit size={20} /> : <MdOutlineFullscreen size={20} />}
      </Button>
    ),
  };
}
