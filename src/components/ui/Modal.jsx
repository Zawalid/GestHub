import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { PiX } from 'react-icons/pi';
import { cn } from '../../utils/helpers';
import { Button } from './Button';

export const Modal = forwardRef(
  ({ children, isOpen, onClose, className, overlayClassName, closeButton, closeOnBlur = true, hideOverlay }, ref) => {
    const content = (
      <Content ref={ref} isOpen={isOpen} className={className}>
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
);

Modal.displayName = 'Modal';

const Content = forwardRef(({ children, isOpen, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'relative flex h-full w-full flex-col overflow-hidden border-border bg-background-primary transition-transform duration-200 sm:rounded-xl',
        className,
        isOpen ? 'scale-100' : 'scale-0'
      )}
    >
      {children}
    </div>
  );
});

Content.displayName = 'Content';

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
