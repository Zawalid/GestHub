import { useState } from "react";
import { Button, SearchInput } from "../../ui";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { MdError } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { setToUrl } from "../../../hooks/useToUrl";
import { PiSquaresFourBold, PiSquareSplitVerticalBold } from "react-icons/pi";
import Shade from "@/components/ui/shade";
import {
  FilterDropDown,
  FilterAside,
  Sort,
  useOfferContext,
  OfferCard,
} from "./index";
function Offers() {
  const [card, setCards] = useState(2);
  const { t } = useTranslation();
  const [parent] = useAutoAnimate({ duration: 300 });
  const {
    filtredoffers: offers,
    searchParams,
    setSearchParams,
    query,
  } = useOfferContext();
  return (
    <div className="relative p-5 py-10 md:px-0  bg-background-secondary">
      <h1 className="text-text-primary font-bold text-3xl w-fit py-4 capitalize">
        Offres de stage recentes
      </h1>
      <div className="grid gap-4 md:me-4 grid-cols-1 md:grid-cols-[auto,1fr]">
        <FilterAside className="hidden md:flex" />
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
              <div className="flex gap-2">
                <Button
                  className="text-text-secondary text-xl hidden md:flex"
                  onClick={() => setCards(2)}
                  shape={"icon"}
                  state={card == 2 && "active"}
                >
                  <PiSquaresFourBold />
                </Button>
                <Button
                  className="text-text-secondary text-xl hidden md:flex"
                  onClick={() => setCards(1)}
                  shape={"icon"}
                  state={card == 1 && "active"}
                >
                  <PiSquareSplitVerticalBold />
                </Button>
              </div>
            </div>
          </div>
          {offers?.length > 0 ? (
            <div
              ref={parent}
              className={` max-h-screen overflow-y-auto py-2 text-text-primary flex flex-wrap justify-center gap-4 my-5`}
            >
              {offers?.map((e, i) => (
                <OfferCard key={i} card={card} offer={e} />
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
