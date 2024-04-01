import { Button } from "@/components/ui";
import { DevTool } from "@hookform/devtools";

export function ModalFormLayout({
  children,
  saveButton,
  cancelButton,
  control,
}) {
  return (
    <>
      <div className="flex-1 overflow-auto">{children}</div>
      <div className="flex mt-5 justify-end gap-3">
        {cancelButton && (
          <Button color="tertiary" {...cancelButton}>
            {cancelButton.text || "Cancel"}
          </Button>
        )}
        <Button {...saveButton}>{saveButton.text || "Save Changes"}</Button>
      </div>

      {control && <DevTool control={control} />}
    </>
  );
}
