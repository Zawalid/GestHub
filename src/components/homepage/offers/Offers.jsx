import { useState } from "react";
import { CiLocationOn, CiFilter } from "react-icons/ci";
import { Button, CheckBox, DropDown, SearchInput } from "../../ui";
import { IoFilter } from "react-icons/io5";
import { FaSortAmountDown, FaSortAmountUpAlt, FaSort } from "react-icons/fa";
import { RiUserSettingsLine } from "react-icons/ri";
import { GiProgression } from "react-icons/gi";
import { useOffer } from "./OffersContext";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { MdError } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { setToUrl } from "../../../hooks/useToUrl";
import { IoIosArrowDown } from "react-icons/io";
import { BiTagAlt } from "react-icons/bi";
import { PiSquaresFourBold, PiTagChevronFill } from "react-icons/pi";
import Shade from "@/components/ui/shade";

function Offers() {
  const { t } = useTranslation();
  const [parent] = useAutoAnimate({ duration: 300 });
  const { offers, searchParams, setSearchParams, query } = useOffer();
  const [card, setCards] = useState(2);
  return (
    <div className="relative p-5 py-10 md:px-0  bg-background-secondary">
      <h1 className="text-text-primary font-bold text-3xl w-fit py-4 capitalize">
        Offres de stage recentes
      </h1>
      <div className="grid gap-4 md:me-4 grid-cols-1 md:grid-cols-[auto,1fr]">
        <FilterAside className={"hidden md:flex"} />
        <div className="">
          <div className="flex justify-between gap-2 ">
            <SearchInput
              className="w-full md:w-1/2"
              onChange={(query) =>
                setToUrl("search", query, searchParams, setSearchParams)
              }
              query={query}
              placeholder={t("hero.placeholder")}
            />
            <div className="flex justify-between">
              <div className="flex gap-2 md:hidden">
                <FilterDropDown />
                <Sort />
              </div>
              <Button
                className="text-text-secondary text-xl hidden md:flex"
                onClick={() => setCards((e) => (e > 1 ? e - 1 : 3))}
                shape={"icon"}
              >
                <PiSquaresFourBold />
              </Button>
            </div>
          </div>
          {offers.length > 0 ? (
            <div
              ref={parent}
              className={` max-h-screen overflow-y-auto p-1 py-4 text-text-primary grid grid-cols-1 md:grid-cols-${card} lg:grid-cols-${card} transition-all duration-200  gap-4 my-5`}
            >
              {offers?.map((e, i) => (
                <OfferCard key={i} offer={e} />
              ))}
            </div>
          ) : (
            <div className="w-full h-full min-h-32 flex gap-2 justify-center items-center font-bold text-xl text-red-600">
              No offers available <MdError />
            </div>
          )}
        </div>
      </div>
      <Shade
        className={
          "absolute top-full left-0 w-full overflow-hidden leading-[0]"
        }
      />
    </div>
  );
}

export default Offers;

function OfferCard({ offer }) {
  const { id, title, date, ville, exp, secteur } = offer;
  const { storedoffers, toggelStoredOffer } = useOffer();
  return (
    <div className="hover:scale-[1.01] transition duration-300   p-1 h-max border border-border rounded-xl shadow-md  space-y-2 capitalize">
      <div className=" bg-background-tertiary rounded-xl p-4 space-y-4">
        <div className="flex justify-between">
          <span className="text-sm font-bold">{date}</span>
          <Button
            onClick={() => toggelStoredOffer(id)}
            color={"secondary"}
            shape={"icon"}
            size={"small"}
          >
            {storedoffers.includes(id) ? (
              <PiTagChevronFill className=" -rotate-90 text-text-primary" />
            ) : (
              <BiTagAlt className=" -rotate-90 text-text-primary" />
            )}
          </Button>
        </div>
        <div className="flex flex-col">
          <span className=" text-text-secondary">DSI</span>
          <span className=" text-xl">{title}</span>
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-secondary">
          <span className=" px-2 p-1 rounded-2xl border border-secondary-hover  text-secondary-hover ">
            {exp}
          </span>
          <span className="px-2 p-1 rounded-2xl border border-secondary-hover  text-secondary-hover ">
            {secteur}
          </span>
        </div>
      </div>
      <div className="flex justify-between px-5 p-2">
        <span className=" text-text-secondary flex items-center gap-2">
          <CiLocationOn className="text-text-primary" /> {ville}
        </span>
        <Button size={"small"}>Postuler</Button>
      </div>
    </div>
  );
}
function FilterDropDown() {
  const {
    secteurs,
    exp,
    setFilterdSect,
    setFilterdExp,
    toggleChecked,
    selectAll,
    showStored,
    selectAllSect,

    selectAllexp,
  } = useOffer();

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
        {[...secteurs].map((sect) => (
          <DropDown.Option
            disabled={selectAllSect}
            key={sect}
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
        {[...exp].map((exp) => (
          <DropDown.Option
            disabled={selectAllexp}
            key={exp}
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
function FilterAside({ className }) {
  const [sectIsOpen, setsectIsOpen] = useState(true);
  const [expIsOpen, setexpIsOpen] = useState(true);
  const {
    secteurs,
    exp,
    setFilterdSect,
    setFilterdExp,
    showStored,
    toggleChecked,
  } = useOffer();
  return (
    <div
      className={`flex max-h-screen flex-col shadow-xl text-text-primary border border-border rounded-r-lg capitalize ${className}`}
    >
      <h1 className="flex items-center gap-3 text-xl font-bold bg-background-tertiary text-text-primary p-1 rounded-tr-lg ">
        <CiFilter /> Filter
      </h1>
      <div className="">
        <div className="flex items-center border-y border-border justify-between p-2 pe-4 hover:bg-background-tertiary gap-2 text-sm font-bold cursor-pointer">
          Saved
          <CheckBox onClick={(e) => showStored(e)} />
        </div>
        <div
          className="flex items-center border-y border-border justify-between hover:bg-background-tertiary p-2 pe-4  gap-2 text-sm font-bold cursor-pointer"
          onClick={() => setsectIsOpen((e) => !e)}
        >
          Secteur
          <IoIosArrowDown />
        </div>
        <div
          className=" px-3 text-text-secondary overflow-hidden transition-[height] flex flex-col justify-around  duration-500"
          style={{
            height: sectIsOpen ? `${[...secteurs].length * 30}px` : "0px",
          }}
        >
          {[...secteurs].map((sect) => (
            <span
              key={sect}
              className="flex items-center gap-2 justify-between"
            >
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
          className=" px-3 text-text-secondary overflow-hidden transition-[height] flex flex-col justify-around  duration-500"
          style={{
            height: expIsOpen ? `${[...exp].length * 30}px` : "0px",
          }}
        >
          {[...exp].map((exp) => (
            <span key={exp} className="flex items-center gap-2 justify-between">
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

function Sort() {
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
        {["date", "title"].map((sect) => (
          <DropDown.Option key={sect} className="justify-between">
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
        {["date", "title"].map((sect) => (
          <DropDown.Option key={sect} className="justify-between">
            {sect}
          </DropDown.Option>
        ))}
      </DropDown.NestedMenu>
    </DropDown>
  );
}
