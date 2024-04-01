import { CiLocationOn } from "react-icons/ci";
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
function Offers() {
  const { t } = useTranslation();
  const [parent] = useAutoAnimate({ duration: 300 });
  const { offers, searchParams, setSearchParams, query } = useOffer();

  return (
    <div className="p-4 md:p-10 py-10 md:px-20 lg:px-32 bg-background-secondary">
      <h1 className="text-text-primary font-bold text-3xl w-fit pb-4">
        Offres de stage recentes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-[auto,auto] gap-3 my-3">
        <SearchInput
          onChange={(query) =>
            setToUrl("search", query, searchParams, setSearchParams)
          }
          query={query}
          placeholder={t("hero.placeholder")}
        />
        <div className="flex gap-2 w-full justify-end md:justify-start">
          <Filter />
          <Sort />
        </div>
      </div>
      <div
        ref={parent}
        className="text-text-primary grid grid-cols-1 md:grid-cols-3  gap-4 my-5"
      >
        {offers?.map((e, i) => (
          <OfferCard key={i} offer={e} />
        ))}
      </div>
      {offers.length == 0 && (
        <div className="w-full h-32 flex justify-center items-center font-bold text-xl text-red-600">
          
          No offers available <MdError />
        </div>
      )}
    </div>
  );
}

export default Offers;

function OfferCard({ offer }) {
  const { title, description, date, ville, exp, secteur } = offer;
  return (
    <div className=" relative border border-border rounded-md shadow-md  space-y-2">
      <p className=" p-3 rounded-t-md  text-text-secondary font-bold bg-primary capitalize">
        {title}
      </p>
      <div className="p-5">
        <span className=" text-sm absolute z-10 top-[90%] left-0 px-3 text-text-secondary">
          {date}
        </span>
        <p>{description.slice(0, 100)}...</p>
        <div className="text-text-secondary text-sm flex gap-2 my-2 capitalize">
          <p className="flex items-center gap-2">
            <CiLocationOn className="text-xlg" />
            {ville}
          </p>
          <p className="flex items-center gap-2">{exp}</p>
          <p className="flex items-center gap-2">{secteur}</p>
        </div>
        <div className="flex justify-end">
          <span className="  px-1 rounded-[px] text-xs font-bold"> 6 mois</span>
        </div>
      </div>
    </div>
  );
}
function Filter() {
  const {
    secteurs,
    exp,
    setFilterdSect,
    setFilterdExp,
    toggleChecked,
    selectAll,
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
      <DropDown.NestedMenu
        toggler={
          <DropDown.Option className="justify-between">
            {" "}
            Secteur
            <RiUserSettingsLine />{" "}
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
            <CheckBox
              disabled={selectAllSect}
              onClick={(e) =>
                !selectAllSect && toggleChecked(e, sect, setFilterdSect)
              }
            />
          </DropDown.Option>
        ))}
      </DropDown.NestedMenu>

      <DropDown.NestedMenu
        toggler={
          <DropDown.Option className="justify-between">
            {" "}
            Experience
            <GiProgression />{" "}
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
function Sort() {
  return (
    <DropDown
      toggler={
        <Button shape="icon">
          {" "}
          <FaSort />{" "}
        </Button>
      }
      options={{ className: "w-40" }}
    >
      <DropDown.Title className="text-center">Sort</DropDown.Title>
      <DropDown.NestedMenu
        toggler={
          <DropDown.Option className="justify-between">
            {" "}
            Asc <FaSortAmountUpAlt />{" "}
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
            {" "}
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
