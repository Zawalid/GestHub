import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { useOfferContext } from "./OffersContext";
import { CheckBox } from "@/components/ui";
import { CiFilter } from "react-icons/ci";

export function FilterAside({ className }) {
  const [sectIsOpen, setsectIsOpen] = useState(true);
  const [datesIsOpen, setdatesIsOpen] = useState(true);
  const [expIsOpen, setexpIsOpen] = useState(true);
  const dates = [
    { name: "Today", interval: "day" },
    { name: "This Week", interval: "week" },
    { name: "This Month", interval: "month" },
    { name: "This Year", interval: "year" },
  ];
  const {
    secteurs,
    exp,
    setFilterdSect,
    setFilterdExp,
    filterByDate,
    showStored,
    toggleChecked,
  } = useOfferContext();
  return (
    <div
      className={`flex w-56 min-h-screen flex-col shadow-xl text-text-primary border border-border rounded-r-lg capitalize ${className}`}
    >
      <h1 className="flex items-center gap-3 font-bold bg-background-tertiary text-text-primary p-1 rounded-tr-lg ">
        <CiFilter /> Filter
      </h1>
      <div className="">
        <div className="flex items-center border-y border-border justify-between p-2 pe-4 hover:bg-background-tertiary gap-2 text-sm font-bold cursor-pointer">
          Saved
          <CheckBox onClick={(e) => showStored(e)} />
        </div>

        <div
          className="flex items-center border-y border-border justify-between p-2 pe-4 hover:bg-background-tertiary gap-2 text-sm font-bold cursor-pointer"
          onClick={() => setdatesIsOpen((e) => !e)}
        >
          Date
          <IoIosArrowDown />
        </div>
        <div
          className=" px-6 text-text-secondary overflow-hidden transition-[height] flex flex-col justify-around  duration-500"
          style={{
            height: datesIsOpen ? `${dates.length * 30}px` : "0px",
          }}
        >
          {dates.map((date, i) => (
            <span key={i} className="flex items-center gap-2 justify-between">
              {date.name}
              <CheckBox
                className="border-text-primary"
                onClick={(e) => filterByDate(e, date.interval)}
              />
            </span>
          ))}
        </div>

        <div
          className="flex items-center border-y border-border justify-between hover:bg-background-tertiary p-2 pe-4  gap-2 text-sm font-bold cursor-pointer"
          onClick={() => setsectIsOpen((e) => !e)}
        >
          Secteur
          <IoIosArrowDown />
        </div>
        <div
          className=" px-6 text-text-secondary overflow-hidden transition-[height] flex flex-col justify-around  duration-500"
          style={{
            height: sectIsOpen ? `${[...secteurs].length * 30}px` : "0px",
          }}
        >
          {[...secteurs].map((sect, i) => (
            <span key={i} className="flex items-center gap-2 justify-between">
              {sect}
              <CheckBox
                onClick={(e) => toggleChecked(e, sect, setFilterdSect)}
              />
            </span>
          ))}
        </div>

        <div
          className="flex items-center border-y border-border justify-between p-2 pe-4 hover:bg-background-tertiary gap-2 text-sm font-bold cursor-pointer"
          onClick={() => setexpIsOpen((e) => !e)}
        >
          Experience
          <IoIosArrowDown />
        </div>
        <div
          className=" px-6 text-text-secondary overflow-hidden transition-[height] flex flex-col justify-around  duration-500"
          style={{
            height: expIsOpen ? `${[...exp].length * 30}px` : "0px",
          }}
        >
          {[...exp].map((exp, i) => (
            <span key={i} className="flex items-center gap-2 justify-between">
              {exp}
              <CheckBox
                className="border-text-primary"
                onClick={(e) => toggleChecked(e, exp, setFilterdExp)}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
