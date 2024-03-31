import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  IoArrowDownOutline,
  IoArrowUpOutline,
  IoEllipsisHorizontalSharp,
  IoEyeOutline,
  IoEyeOffOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaSort } from "react-icons/fa6";
import { Button, DropDown } from "../../ui";
import { useContext } from "react";
import { TableContext } from "./TableLayout";

//* Table
export function Table() {
  const { columns, rows } = useContext(TableContext);
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
            {Object.values(row).map((v) => (
              <Tr key={v} name={v} />
            ))}
            <Tr hide={true} name="Actions" />
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
            {columns.map((title) => (
              <Th key={title}>{title}</Th>
            ))}
            <Th hide={true} name="Actions" />
          </tr>
        </thead>
        {render()}
      </table>
    </div>
  );
}
function Th({ children, hide }) {
  return (
    <th scope="col" className="p-2">
      {hide ? (
        <span className="sr-only">Edit</span>
      ) : (
        <DropDown
          toggler={
            <Button color="tertiary" type="transparent" display="with-icon">
              {children}
              <FaSort size={12} />
            </Button>
          }
          options={{ placement: "bottom-end", className: "w-28 text-xs" }}
        >
          <DropDown.Option>
            <IoArrowUpOutline />
            Asc
          </DropDown.Option>
          <DropDown.Option>
            <IoArrowDownOutline />
            Desc
          </DropDown.Option>
          <DropDown.Divider />
          <DropDown.Option>
            <IoEyeOffOutline />
            Hide
          </DropDown.Option>
        </DropDown>
      )}
    </th>
  );
}
function Tr({ name, hide }) {
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
        name
      )}
    </td>
  );
}
