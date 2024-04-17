import {
  IoArrowUpOutline,
  IoArrowDownOutline,
  IoEyeOffOutline,
  FaSort,
} from "@/components/ui/Icons";

import { Button, DropDown } from "@/components/ui";
import { useTable } from ".";

const icons = {
  asc: <IoArrowUpOutline />,
  desc: <IoArrowDownOutline />,
};

export function Sort({ column }) {
  const { sortBy, direction, onSort, onChangeView, columns } = useTable();

  const sort = (dir) => onSort(column.key, dir);

  return (
    <DropDown
      toggler={
        <Button color="tertiary" type="transparent" display="with-icon">
          {column.displayLabel}
          {sortBy === column.key ? icons[direction] : <FaSort size={12} />}
        </Button>
      }
      options={{  className: "w-28 text-xs" }}
    >
      <DropDown.Option onClick={() => sort("asc")}>
        {icons.asc}
        Asc
      </DropDown.Option>
      <DropDown.Option onClick={() => sort("desc")}>
        {icons.desc}
        Desc
      </DropDown.Option>
      {columns.filter((c) => c.visible).length === 1 || (
        <>
          <DropDown.Divider />
          <DropDown.Option onClick={() => onChangeView(column.displayLabel)}>
            <IoEyeOffOutline />
            Hide
          </DropDown.Option>
        </>
      )}
    </DropDown>
  );
}
