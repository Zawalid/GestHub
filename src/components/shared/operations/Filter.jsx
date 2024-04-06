import { IoFilter } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { Button, CheckBox, DropDown } from "@/components/ui";
import { useOperations } from "./useOperations";

const toggleChecked = (filter, value) =>
  filter.map((f) => (f.value === value ? { ...f, checked: !f.checked } : f));

export function Filter() {
  const { filters, onFilter, appliedFiltersNumber,isLoading,error } = useOperations();

  if (!filters) return null;

  return (
    <DropDown
      toggler={
        <Button display="with-icon" color="tertiary">
          Filter
          <IoFilter />
          <span
            className={`absolute -top-2 -right-2 text-xs leading-5 text-center font-bold bg-primary text-white rounded-full w-5 h-5 transition-transform duration-300 ${
              appliedFiltersNumber > 0 ? "scale-100" : "scale-0"
            }`}
          >
            {appliedFiltersNumber}
          </span>
        </Button>
      }
      options={{
        className: "w-44 max-h-[300px] overflow-y-auto",
        shouldCloseOnClick: false,
      }}
      togglerClassName="relative w-28 justify-between"
      togglerDisabled={isLoading || error}
    >
      {Object.keys(filters).map((key) => (
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

          <DropDown.Divider key={`${key}-divider`} />
        </>
      ))}
      <DropDown.Option
        onClick={() => onFilter(null, true)}
        disabled={appliedFiltersNumber === 0}
      >
        <GrPowerReset />
        Reset Filters
      </DropDown.Option>
    </DropDown>
  );
}
