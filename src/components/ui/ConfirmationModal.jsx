import { Button, Modal } from ".";
import { PiWarningFill } from "react-icons/pi";

export function ConfirmationModal({
  isOpen,
  message,
  title,
  confirmText,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      isOpen={isOpen}
      className="max-w-[90%] sm:max-w-[600px] h-fit flex-col gap-5 border  py-3 shadow-sm child-padding w-fit sm:py-4"
      overlayClassName="z-50"
      closeOnBlur={false}
    >
      <div className="flex items-center gap-3  pb-3">
        <div className="grid h-6 w-6 place-content-center rounded-full bg-[#F57800] text-white sm:h-8 sm:w-8 sm:text-lg">
          <PiWarningFill />
        </div>
        <h1 className="text-xl font-bold text-text-primary   sm:text-2xl">
          {title}
        </h1>
      </div>
      <h4 className="text-sm font-medium text-text-secondary sm:text-base">
        {message}
      </h4>

      <div className="mt-3 flex  items-center justify-end gap-3 border-t border-border pt-3">
        <Button color="tertiary" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="delete" onClick={onConfirm}>
          {confirmText || "Delete"}
        </Button>
      </div>
    </Modal>
  );
}
