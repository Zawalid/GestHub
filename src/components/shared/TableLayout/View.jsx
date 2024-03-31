import { useContext } from "react";
import { TableContext } from "./TableLayout";
import { BsTable } from "react-icons/bs";
import { Button, CheckBox, DropDown } from "../../ui";

export function View() {
  const { columns } = useContext(TableContext);
  return (
    <DropDown
      toggler={<Button shape="icon">
        <BsTable />
      </Button>}
      options={{
        className: "w-40",
      }}
    >
      {columns.map((key) => (
        <DropDown.Option key={key} className="justify-between">
          {key}
          <CheckBox  />
        </DropDown.Option>
      ))}
    </DropDown>
  );
}
