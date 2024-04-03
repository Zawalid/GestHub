import { RiUserSettingsLine } from "react-icons/ri";
import { GiProgression } from "react-icons/gi";
import { IoFilter } from "react-icons/io5";
import { Button, CheckBox, DropDown } from "@/components/ui";
import { useOfferContext } from "./OffersContext";
import { BsCalendarDate } from "react-icons/bs";

export function FilterDropDown() {
  const {
    secteurs,
    exp,
    setFilterdSect,
    setFilterdExp,
    toggleChecked,
    selectAll,
    showStored,
    selectAllSect,
    filterByDate,
    selectAllexp,
  } = useOfferContext();
    const dates = [
      { name: "Today", interval: "day" },
      { name: "This Week", interval: "week" },
      { name: "This Month", interval: "month" },
      { name: "This Year", interval: "year" },
    ];
  return (
    <DropDown
      toggler={
        <Button shape="icon">
          <IoFilter />
        </Button>
      }
      options={{ className: "w-40", shouldCloseOnClick: false }}
    >
      <DropDown.Title>Filter</DropDown.Title>
      <DropDown.Option className="justify-between">
        Saved <CheckBox onClick={(e) => showStored(e)} />
      </DropDown.Option>

      <DropDown.NestedMenu
        toggler={
          <DropDown.Option className="justify-between">
            Date
            <BsCalendarDate />
          </DropDown.Option>
        }
        options={{ className: "w-40", placement: "right" }}
      >
        {dates.map((date, i) => (
          <DropDown.Option key={i} className="justify-between">
            {date.name}
            <CheckBox onClick={(e) => filterByDate(e, date.interval)} />
          </DropDown.Option>
        ))}
      </DropDown.NestedMenu>

      <DropDown.NestedMenu
        toggler={
          <DropDown.Option className="justify-between">
            Secteur
            <RiUserSettingsLine />
          </DropDown.Option>
        }
        options={{ className: "w-40", placement: "right" }}
      >
        <DropDown.Option className="justify-between">
          all
          <CheckBox onClick={(e) => selectAll(e, setFilterdSect, "sect")} />
        </DropDown.Option>
        <DropDown.Divider />
        {[...secteurs].map((sect, i) => (
          <DropDown.Option
            disabled={selectAllSect}
            key={i}
            className="justify-between"
          >
            {sect}
            <CheckBox onClick={(e) => toggleChecked(e, sect, setFilterdSect)} />
          </DropDown.Option>
        ))}
      </DropDown.NestedMenu>

      <DropDown.NestedMenu
        toggler={
          <DropDown.Option className="justify-between">
            Experience
            <GiProgression />
          </DropDown.Option>
        }
        options={{ className: "w-40", placement: "right" }}
      >
        <DropDown.Option className="justify-between">
          all <CheckBox onClick={(e) => selectAll(e, setFilterdExp)} />
        </DropDown.Option>
        <DropDown.Divider />
        {[...exp].map((exp, i) => (
          <DropDown.Option
            disabled={selectAllexp}
            key={i}
            className="justify-between"
          >
            {exp}
            <CheckBox
              disabled={selectAllexp}
              onClick={(e) => toggleChecked(e, exp, setFilterdExp)}
            />
          </DropDown.Option>
        ))}
      </DropDown.NestedMenu>
    </DropDown>
  );
}
