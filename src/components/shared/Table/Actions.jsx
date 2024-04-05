import { Button, DropDown } from "@/components/ui";
import {
  IoEllipsisHorizontalSharp,
  IoEyeOutline,
  IoTrashOutline,
  MdDriveFileRenameOutline,
} from "@/components/ui/Icons";
import { useTable } from ".";

export function Actions({ onUpdate, onDelete, row }) {
  const { showForm, confirmDelete, resourceName, rows, onPrevPage } =
    useTable();
  return (
    <DropDown
      toggler={
        <Button shape="icon">
          <IoEllipsisHorizontalSharp />
        </Button>
      }
      options={{ placement: "bottom-end" }}
    >
      <DropDown.Option>
        <IoEyeOutline />
        View
      </DropDown.Option>
      <DropDown.Option
        onClick={() =>
          showForm({
            defaultValues: row,
            onSubmit: (data) => onUpdate({ id: row.id, data }),
            isOpen: true,
            submitButtonText: "Save Changes",
            heading: `Update ${resourceName} #${row.id}`,
          })
        }
      >
        <MdDriveFileRenameOutline />
        Edit
      </DropDown.Option>
      <DropDown.Option
        onClick={() =>
          confirmDelete(true, () => {
            onDelete(row.id);
            rows?.length === 1 && onPrevPage();
          })
        }
      >
        <IoTrashOutline />
        Delete
      </DropDown.Option>
    </DropDown>
  );
}
