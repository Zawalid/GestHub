import { IoFilter } from "react-icons/io5";
import { Button, CheckBox, DropDown } from "../../ui";
import { useTable } from ".";

const toggleChecked = (filter, value) =>
  filter.map((f) => (f.value === value ? { ...f, checked: !f.checked } : f));

export function Filter() {
  const { filters, onFilter } = useTable();

  return (
    <DropDown
      toggler={
        <Button shape="icon">
          <IoFilter />
        </Button>
      }
      options={{
        className: "w-40",
        shouldCloseOnClick: false,
      }}
    >
      {Object.keys(filters).map((key, i) => (
        <>
          <DropDown.Title key={key}>
            <span className="capitalize">{key}</span>
          </DropDown.Title>
          {filters[key].map(({ value, checked }) => (
            <DropDown.Option key={value} className="justify-between">
              {value}
              <CheckBox
                checked={checked}
                onChange={() =>
                  onFilter({ [key]: toggleChecked(filters[key], value) })
                }
              />
            </DropDown.Option>
          ))}
          {i < Object.keys(filters).length - 1 && <DropDown.Divider />}
        </>
      ))}
    </DropDown>
  );
}
