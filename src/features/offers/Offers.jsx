import { useState } from "react";
import { Button, SearchInput } from "../../components/ui";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useTranslation } from "react-i18next";
import { setToUrl } from "../../hooks/useToUrl";
import { PiSquaresFourBold, PiSquareSplitVerticalBold } from "react-icons/pi";
import {
  FilterDropDown,
  FilterAside,
  Sort,
  useOfferContext,
  OfferCard,
} from "./index";
import { Status } from "@/components/ui/Status";
import Shade from "@/components/ui/shade";

function Offers() {
  const [card, setCards] = useState(2);
  const { t } = useTranslation();
  const [parent] = useAutoAnimate({ duration: 300 });
  const {
    error,
    isLoading,
    filtredoffers: offers,
    searchParams,
    setSearchParams,
    query,
  } = useOfferContext();
  return (
    <div
      id="offers"
      className={`relative md:px-0  bg-background-secondary ${
        isLoading || error ? "min-h-[50vh]" : ""
      }`}
    >
      {error && <Status status="error" heading={error.message} />}
      {isLoading && <Status status="loading" />}
      {!error && !isLoading && (
        <div className="p-1 md:p-5">
          <h1 className="text-secondary font-bold text-3xl w-fit py-10 capitalize">
            Offres de stage recentes
          </h1>
          <div className="grid gap-4 md:me-4 grid-cols-1 md:grid-cols-[auto,1fr]">
            <FilterAside className="hidden md:flex" />
            <div className="relative">
              <div className="flex justify-between gap-2 ">
                <SearchInput
                  className=" w-3/4"
                  onChange={(query) =>
                    setToUrl("search", query, searchParams, setSearchParams)
                  }
                  query={query}
                  placeholder={t("hero.placeholder")}
                />
                <div className=" ms-auto flex justify-between">
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
                  className={`max-h-screen overflow-y-auto p-1 py-4 text-text-primary grid grid-cols-1 md:grid-cols-${card} justify-center gap-4 my-5`}
                >
                  {offers?.map((e, i) => (
                    <OfferCard key={i} offer={e} />
                  ))}
                </div>
              ) : (
                <Status status="noResults" heading="No offers available" />
              )}
            </div>
          </div>
        </div>
      )}
      <Shade
        className=" absolute rotate-180 bottom-full left-0 w-full overflow-hidden leading-[0] "
        svg="h-14 md:h-16 w-full"
      />
    </div>
  );
}

export default Offers;
