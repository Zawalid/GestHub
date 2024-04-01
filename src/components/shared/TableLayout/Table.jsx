// import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  IoEllipsisHorizontalSharp,
  IoEyeOutline,
  IoTrashOutline,
  MdDriveFileRenameOutline,
} from "../../ui/Icons";

import { Button, DropDown } from "../../ui";
import { Sort } from "./Sort";
import { formatToCamelCase } from "../../../utils/helpers";
import { useTable } from ".";

export function Table() {
  const { columns, rows } = useTable();
  // const [parent] = useAutoAnimate({ duration: 300 });

  const render = () => {
    if (rows.length === 0)
      return (
        <tbody className="flex absolute h-[88%] w-full items-center justify-center text-text-tertiary">
          <tr>
            <td>No results found</td>
          </tr>
        </tbody>
      );
    return (
      <tbody className="text-sm h-fit font-medium divide-y divide-border text-text-primary">
        {rows.map((row) => (
          <Row
            key={row.id}
            row={row}
            visibleColumns={columns.filter((c) => c.visible)}
          />
        ))}
      </tbody>
    );
  };

  return (
    <div className="relative flex-1 overflow-x-auto">
      <table className="w-full whitespace-nowrap overflow-x-auto  text-left">
        <thead className="bg-background-secondary ">
          <tr>
            {columns
              .filter((c) => c.visible)
              .map(({ label }) => (
                <Column key={label} column={label} />
              ))}
            <Column hide={true} />
          </tr>
        </thead>
        {render()}
      </table>
    </div>
  );
}
function Column({ column, hide }) {
  return (
    <th scope="col" className="p-2">
      {hide ? <span className="sr-only">Edit</span> : <Sort column={column} />}
    </th>
  );
}
function Row({ row, visibleColumns }) {
  const { showForm, onUpdate, onDelete, confirmDelete } = useTable();

  return (
    <tr>
      {visibleColumns.map((col) => (
        <td key={col.label} className="px-6 py-4">
          {row[formatToCamelCase(col.label)]}
        </td>
      ))}
      <td className="px-6 py-4">
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
                onSubmit: (data) => onUpdate(row.id, data),
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
      </td>
    </tr>
  );
}
