import { createPortal } from "react-dom";
import { cn } from "../../utils/helpers";
import { Button } from "./Button";
import { PiX } from "react-icons/pi";

export function Modal({
  children,
  isOpen,
  onClose,
  className,
  overlayClassName,
  closeButton,
  closeOnBlur = true,
}) {
  return createPortal(
    <Overlay
      isOpen={isOpen}
      closeOnBlur={closeOnBlur}
      onClose={onClose}
      className={overlayClassName}
    >
      <Content isOpen={isOpen} className={className}>
        {closeButton && (
          <Button
            className="absolute z-10 right-2 top-2"
            onClick={onClose}
            shape="icon"
            size="small"
          >
            <PiX />
          </Button>
        )}
        {children}
      </Content>
    </Overlay>,
    document.body
  );
}

export function Overlay({
  children,
  isOpen,
  closeOnBlur,
  onClose,
  className = "z-30",
}) {
  return (
    <div
      className={cn(
        "fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/25 backdrop-blur-[1px] transition-[visibility] duration-200",
        className,
        isOpen ? "visible" : "invisible"
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
        "flex relative h-full w-full overflow-hidden flex-col sm:rounded-xl border-border bg-background-primary transition-transform duration-200",
        className,
        isOpen ? "scale-100" : "scale-0"
      )}
    >
      {children}
    </div>
  );
}
