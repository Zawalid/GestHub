import { IoFilter } from "react-icons/io5";
import { Button, CheckBox, DropDown } from "../../ui";

//* Filter
export function Filter() {
  return (
    <DropDown
      toggler={<Button shape="icon">
        <IoFilter />
      </Button>}
      options={{
        className: "w-40",
      }}
    >
      <DropDown.Option className="justify-between">
        Male
        <CheckBox checked={true} />
      </DropDown.Option>
      <DropDown.Option className="justify-between">
        Female
        <CheckBox checked={true} />
      </DropDown.Option>
    </DropDown>
  );
}
