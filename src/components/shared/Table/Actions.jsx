import { Button, DropDown } from "@/components/ui";
import {
  IoEllipsisHorizontalSharp,
  IoEyeOutline,
  IoTrashOutline,
  MdDriveFileRenameOutline,
} from "@/components/ui/Icons";
import { useTable } from ".";
import { Link, useLocation } from "react-router-dom";

export function Actions({ onUpdate, onDelete, row }) {
  const { showForm, confirmDelete, resourceName, rows, onPrevPage } =
    useTable();
  const location = useLocation();

  return (
    <DropDown
      toggler={
        <Button shape="icon">
          <IoEllipsisHorizontalSharp />
        </Button>
      }
      options={{ placement: "bottom-end" }}
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
