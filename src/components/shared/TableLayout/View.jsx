import { useContext } from "react";
import { TableContext } from "./TableLayout";
import { BsTable } from "react-icons/bs";
import { Button, CheckBox, DropDown } from "../../ui";

export function View() {
  const { columns, onChangeView } = useContext(TableContext);
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
        .filter((c) => c.label !== "ID")
        .map(({ label, visible }) => (
          <DropDown.Option key={label} className="justify-between">
            {label}
            <CheckBox
              checked={visible}
              onChange={() =>
                onChangeView(
                  columns.map((c) =>
                    c.label === label ? { ...c, visible: !visible } : c
                  )
                )
              }
            />
          </DropDown.Option>
        ))}
    </DropDown>
  );
}
