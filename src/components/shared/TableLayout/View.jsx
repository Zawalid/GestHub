import { useTable } from ".";

import { BsTable } from "react-icons/bs";
import { Button, CheckBox, DropDown } from "../../ui";

export function View() {
  const { columns, onChangeView } = useTable();
  return (
    <DropDown
      toggler={
        <Button shape="icon">
          <BsTable />
        </Button>
      }
      options={{ className: "w-40", shouldCloseOnClick: false }}
    >
      {columns
        .filter((c) => c.label !== "id")
        .map(({ label, visible }) => (
          <DropDown.Option key={label} className="justify-between">
            {label}
            <CheckBox checked={visible} onChange={() => onChangeView(label)} />
          </DropDown.Option>
        ))}
    </DropDown>
  );
}
