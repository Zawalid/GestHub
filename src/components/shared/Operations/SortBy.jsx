import { DropDown } from "@/components/ui";
import {
  IoChevronForwardOutline,
  PiCheckBold,
  PiSortAscending,
} from "@/components/ui/Icons";
import { useOperations } from "./useOperations";
import { options } from "./ActionsDropDown";

export function SortBy() {
  const { sortBy, onSort, sortOptions } = useOperations();

  return (
    <DropDown.NestedMenu
      toggler={
        <DropDown.Option className="justify-between">
          <PiSortAscending /> <span className="text-start">Sort By</span>
          <IoChevronForwardOutline />
        </DropDown.Option>
      }
      options={options}
    >
      {sortOptions.map(({ display, key }) => (
        <DropDown.Option
          key={display}
          isCurrent={sortBy === key}
          onClick={() => onSort(key)}
          className="justify-between"
        >
          <span>{display}</span>
          {sortBy === key && <PiCheckBold />}
        </DropDown.Option>
      ))}
    </DropDown.NestedMenu>
  );
}
