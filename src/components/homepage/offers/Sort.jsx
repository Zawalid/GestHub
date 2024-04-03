import { Button, DropDown } from "@/components/ui";
import { FaSortAmountDown, FaSortAmountUpAlt, FaSort } from "react-icons/fa";

export function Sort() {
  return (
    <DropDown
      toggler={
        <Button shape="icon">
          <FaSort />
        </Button>
      }
      options={{ className: "w-40" }}
    >
      <DropDown.Title className="text-center">Sort</DropDown.Title>
      <DropDown.NestedMenu
        toggler={
          <DropDown.Option className="justify-between">
            Asc <FaSortAmountUpAlt />
          </DropDown.Option>
        }
        options={{ className: "w-40", placement: "right" }}
      >
        {["date", "title"].map((sect, i) => (
          <DropDown.Option key={i} className="justify-between">
            {sect}
          </DropDown.Option>
        ))}
      </DropDown.NestedMenu>
      <DropDown.NestedMenu
        toggler={
          <DropDown.Option className="justify-between">
            Desc <FaSortAmountDown />
          </DropDown.Option>
        }
        options={{ className: "w-40", placement: "right" }}
      >
        {["date", "title"].map((sect, i) => (
          <DropDown.Option key={i} className="justify-between">
            {sect}
          </DropDown.Option>
        ))}
      </DropDown.NestedMenu>
    </DropDown>
  );
}
