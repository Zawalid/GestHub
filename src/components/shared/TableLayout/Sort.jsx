import {
  IoArrowUpOutline,
  IoArrowDownOutline,
  IoEyeOffOutline,
  FaSort,
} from "../../ui/Icons";

import { Button, DropDown } from "../../ui";
import { formatToCamelCase } from "../../../utils/helpers";
import { useTable } from ".";

const icons = {
  asc: <IoArrowUpOutline />,
  desc: <IoArrowDownOutline />,
};

export function Sort({ column }) {
  const { sortBy, direction, onSort, onChangeView } = useTable();

  const sort = (dir) => onSort(formatToCamelCase(column), dir);

  return (
    <DropDown
      toggler={
        <Button color="tertiary" type="transparent" display="with-icon">
          {column === "id" ? "ID" : column}
          {sortBy === formatToCamelCase(column) ? (
            icons[direction]
          ) : (
            <FaSort size={12} />
          )}
        </Button>
      }
      options={{ placement: "bottom-end", className: "w-28 text-xs" }}
    >
      <DropDown.Option onClick={() => sort("asc")}>
        {icons.asc}
        Asc
      </DropDown.Option>
      <DropDown.Option onClick={() => sort("desc")}>
        {icons.desc}
        Desc
      </DropDown.Option>
      <DropDown.Divider />
      {column === "id" || (
        <DropDown.Option onClick={() => onChangeView(column)}>
          <IoEyeOffOutline />
          Hide
        </DropDown.Option>
      )}
    </DropDown>
  );
}
