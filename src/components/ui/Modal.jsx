import { createPortal } from "react-dom";
import { cn } from "../../utils/helpers";

export function Modal({
  children,
  isOpen,
  onClose,
  className,
  overlayClassName,
}) {
  return createPortal(
    <Overlay isOpen={isOpen} onClose={onClose} className={overlayClassName}>
      <Content isOpen={isOpen} className={className}>
        {children}
      </Content>
    </Overlay>,
    document.body
  );
}

export function Overlay({ children, isOpen, onClose, className = "z-30" }) {
  return (
    <div
      className={cn(
        "fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/25 backdrop-blur-[1px] transition-[visibility] duration-200",
        className,
        isOpen ? "visible" : "invisible"
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.();
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
        "flex flex-col rounded-lg border-border bg-background-primary transition-transform duration-200",
        className,
        isOpen ? "scale-100" : "scale-0"
      )}
    >
      {children}
    </div>
  );
}
