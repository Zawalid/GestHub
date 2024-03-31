import { DevTool } from "@hookform/devtools";
import { Button } from "../ui";

export function Tab({ children, saveButton, cancelButton, control }) {
  return (
    <>
      <div className="flex-1 overflow-auto">{children}</div>
      <div className="flex  justify-end gap-3">
        {cancelButton && (
          <Button color="tertiary" {...cancelButton}>
            Cancel
          </Button>
        )}
        <Button {...saveButton}>{saveButton.text || "Save Changes"}</Button>
      </div>
      <DevTool control={control} />
    </>
  );
}
