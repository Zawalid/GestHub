import { createPortal } from 'react-dom';
import { cn } from '../../utils/helpers';
import { Button } from './Button';
import { PiX } from 'react-icons/pi';

export function Modal({
  children,
  isOpen,
  onClose,
  className,
  overlayClassName,
  closeButton,
  closeOnBlur = true,
  hideOverlay,
}) {
  const content = (
    <Content isOpen={isOpen} className={className}>
      {(closeButton || closeButton === false) && (
        <Button
          className={`absolute right-2 top-2 z-10 ${closeButton === false ? 'flex md:hidden' : ''}`}
          onClick={onClose}
          shape='icon'
          size='small'
        >
          <PiX />
        </Button>
      )}
      {children}
    </Content>
  );
  return createPortal(
    hideOverlay ? (
      content
    ) : (
      <Overlay isOpen={isOpen} closeOnBlur={closeOnBlur} onClose={onClose} className={overlayClassName}>
        {content}
      </Overlay>
    ),
    document.getElementById('root')
  );
}

export function Overlay({ children, isOpen, closeOnBlur, onClose, className = 'z-30' }) {
  return (
    <div
      className={cn(
        'fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/40 backdrop-blur-[1px] transition-[visibility] duration-200',
        className,
        isOpen ? 'visible' : 'invisible'
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeOnBlur && onClose?.();
        }
      }}
    >
      {children}
    </div>
  );
}

function Content({ children, isOpen, className }) {
  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col overflow-hidden border-border bg-background-primary transition-transform duration-200 sm:rounded-xl',
        className,
        isOpen ? 'scale-100' : 'scale-0'
      )}
    >
      {children}
    </div>
  );
}
