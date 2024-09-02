import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { PiX } from 'react-icons/pi';
import { cn } from '../../utils/helpers';
import { Button } from './Button';

/**
 * Modal component that can be used to display content in a modal dialog.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @param {boolean} props.isOpen - Determines if the modal is open or closed.
 * @param {function} props.onClose - Function to be called when the modal is requested to be closed.
 * @param {string} [props.className] - Additional class names to apply to the modal.
 * @param {string} [props.overlayClassName] - Additional class names to apply to the overlay.
 * @param {boolean} [props.closeButton] - Determines if a close button should be displayed.
 * @param {boolean} [props.closeOnBlur=true] - Determines if the modal should close when clicking outside of it.
 * @param {boolean} [props.hideOverlay] - Determines if the overlay should be hidden.
 * @param {React.Ref} ref - Ref to be forwarded to the modal element.
 *
 * @returns {JSX.Element} The rendered modal component.
 */
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
