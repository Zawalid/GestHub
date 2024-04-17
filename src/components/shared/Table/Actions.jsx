import { Button, DropDown } from "@/components/ui";
import {
  IoEllipsisHorizontalSharp,
  IoEyeOutline,
  IoTrashOutline,
  MdDriveFileRenameOutline,
} from "@/components/ui/Icons";
import { useTable } from ".";
import { Link, useLocation } from "react-router-dom";
import { useConfirmationModal } from "@/hooks/useConfirmationModal";

export function Actions({ onUpdate, onDelete, row }) {
  const { showForm, confirmOptions, resourceName, rows, onPrevPage } =
    useTable();
  const location = useLocation();
  const { openModal } = useConfirmationModal();

  return (
    <DropDown
      toggler={
        <Button shape="icon">
          <IoEllipsisHorizontalSharp />
        </Button>
      }
    >
      <Link to={`${location.pathname}/${row.id}`} replace={true}>
        <DropDown.Option>
          <IoEyeOutline />
          View
        </DropDown.Option>
      </Link>
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
          openModal({
            ...confirmOptions,
            onConfirm: () => {
              onDelete(row.id);
              rows?.length === 1 && onPrevPage();
            },
          })
        }
      >
        <IoTrashOutline />
        Delete
      </DropDown.Option>
    </DropDown>
  );
}
