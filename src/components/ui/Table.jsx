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
import { Button } from "./Button";
import { DropDown } from "./DropDown";

export function Table({ columns, rows }) {
  const [parent] = useAutoAnimate({ duration: 500 });
  return (
    <table className="w-full whitespace-nowrap overflow-x-auto  text-left">
      <thead className="bg-background-secondary ">
        <tr>
          {columns.map((title) => (
            <Th key={title}>{title}</Th>
          ))}
          <Th hide={true} name="Actions" />
        </tr>
      </thead>
      <tbody
        className="text-sm font-medium divide-y divide-border text-text-primary"
        ref={parent}
      >
        {rows.map((row, i) => (
          <tr key={i}>
            {Object.values(row).map((v) => (
              <Tr key={v} name={v} />
            ))}
            <Tr hide={true} name="Actions" />
          </tr>
        ))}
      </tbody>
    </table>
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
