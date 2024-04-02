import { Button, DropDown } from "@/components/ui";
import {
  IoEllipsisHorizontalSharp,
  IoEyeOutline,
  IoTrashOutline,
  MdDriveFileRenameOutline,
} from "@/components/ui/icons";
import { useTable } from ".";

export function Actions({ onUpdate, onDelete, row }) {
  const { showForm, confirmDelete } = useTable();

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
            submitButtonText: "Save Changes",
            heading: `Update Intern #${row.id}`,
            isOpen: true,
          })
        }
      >
        <MdDriveFileRenameOutline />
        Edit
      </DropDown.Option>
      <DropDown.Option
        onClick={() =>
          confirmDelete({
            isOpen: true,
            title: "Delete Intern",
            message: "Are you sure you want to delete this intern ?",
            onConfirm: () => onDelete(row.id),
          })
        }
      >
        <IoTrashOutline />
        Delete
      </DropDown.Option>
    </DropDown>
  );
}
