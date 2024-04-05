import { DropDown } from "@/components/ui";
import {
  PiCheckBold,
  IoChevronForwardOutline,
  MdOutlineSortByAlpha,
} from "@/components/ui/Icons";
import { useOperations } from "./useOperations";
import { options } from "./DropDown";

export function OrderBy() {
  const { direction, onOrder } = useOperations();
  return (
    <DropDown.NestedMenu
      toggler={
        <DropDown.Option className="justify-between">
          <MdOutlineSortByAlpha />
          <span className="text-start">Order By</span>
          <IoChevronForwardOutline />
        </DropDown.Option>
      }
      options={options}
    >
      <DropDown.Option
        onClick={() => onOrder("asc")}
        className="justify-between"
        isCurrent={direction === "asc"}
      >
        <span>Ascending</span>
        {direction === "asc" && <PiCheckBold />}
      </DropDown.Option>
      <DropDown.Option
        onClick={() => onOrder("desc")}
        className="justify-between"
        isCurrent={direction === "desc"}
      >
        <span>Descending</span>
        {direction === "desc" && <PiCheckBold />}
      </DropDown.Option>
    </DropDown.NestedMenu>
  );
}
