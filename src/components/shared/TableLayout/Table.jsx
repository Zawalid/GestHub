import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  IoEllipsisHorizontalSharp,
  IoEyeOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { Button, DropDown } from "../../ui";
import { Sort } from "./Sort";
import { formatToCamelCase } from "../../../utils/helpers";
import { useTable } from ".";

export function Table() {
  const { columns, rows } = useTable();
  const [parent] = useAutoAnimate({ duration: 300 });

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
        {rows?.map((row, i) => (
          <tr key={i}>
            {columns
              .filter((c) => c.visible)
              .map((v) => (
                <Tr key={row[v.label]}>{row[formatToCamelCase(v.label)]}</Tr>
              ))}
            <Tr hide={true} />
          </tr>
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
                <Th key={label} column={label} />
              ))}
            <Th hide={true} />
          </tr>
        </thead>
        {render()}
      </table>
    </div>
  );
}
function Th({ column, hide }) {
  return (
    <th scope="col" className="p-2">
      {hide ? <span className="sr-only">Edit</span> : <Sort column={column} />}
    </th>
  );
}
function Tr({ children, hide }) {
  return (
    <td className="px-6 py-4 ">
      {hide ? (
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
          <DropDown.Option>
            <MdDriveFileRenameOutline />
            Edit
          </DropDown.Option>
          <DropDown.Option>
            <IoTrashOutline />
            Delete
          </DropDown.Option>
        </DropDown>
      ) : (
        children
      )}
    </td>
  );
}
