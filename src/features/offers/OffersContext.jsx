import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { createContext, useContext } from "react";
import { toLocalStorage } from "@/hooks/useLocalStorageState";
import { useOffers } from "./useOffers";
import { DateTime, Interval } from "luxon";

const OffersContext = createContext();

function OffersProvider({ children }) {
  const { offers, error, isLoading } = useOffers();
  const [filtredoffers, setFiltredoffers] = useState(offers);
  const [storedoffers, setStoredOffers] = useState(toLocalStorage("offers"));
  const [isShowStor, setisShowStor] = useState(false);
  const secteurs = new Set(offers?.map((e) => e.secteur));
  const exp = new Set(offers?.map((e) => e.exp));
  const [filterdSect, setFilterdSect] = useState([]);
  const [filterdExp, setFilterdExp] = useState([]);
  const [selectAllSect, setselectAllSect] = useState(false);
  const [selectAllexp, setselectAllexp] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const value = {
    error,
    isLoading,
    filtredoffers,
    storedoffers,
    toggelStoredOffer,
    showStored,
    filterByDate,
    secteurs,
    exp,
    setFilterdSect,
    filterdSect,
    setFilterdExp,
    filterdExp,
    toggleChecked,
    selectAllSect,
    selectAllexp,
    selectAll,
    searchParams,
    setSearchParams,
    query,
  };

  useEffect(() => {
    setFiltredoffers(offers);
  }, [offers]);

  //filter by all sect or all exp
  function selectAll(e, action, item) {
    if (e.target.checked) {
      item == "sect" ? setselectAllSect(true) : setselectAllexp(true);
      action([]);
    } else {
      item == "sect" ? setselectAllSect(false) : setselectAllexp(false);
    }
  }
  //filter by checked secteur or experience
  function toggleChecked(e, item, action) {
    e.target.checked
      ? action((f) => [...f, item])
      : action((f) => f.filter((e) => e !== item));
  }
  //filter effect
  useEffect(() => {
    if (isShowStor) return;
    if (filterdExp.length == 0) {
      setFiltredoffers(offers);
    }
    if (filterdSect.length == 0) {
      setFiltredoffers(offers);
    }
    if (filterdExp.length > 0 && filterdSect.length == 0) {
      setFiltredoffers(offers.filter((e) => filterdExp.includes(e.exp)));
    }
    if (filterdSect.length > 0 && filterdExp.length == 0) {
      setFiltredoffers(offers.filter((e) => filterdSect.includes(e.secteur)));
    }
    if (filterdSect.length > 0 && filterdExp.length > 0) {
      setFiltredoffers(
        offers.filter(
          (e) => filterdSect.includes(e.secteur) && filterdExp.includes(e.exp)
        )
      );
    }
  }, [filterdSect, filterdExp, isShowStor, offers]);
  //search effect
  useEffect(() => {
    query.length > 2
      ? setFiltredoffers((e) =>
          e?.filter((e) =>
            (e.title + e.description)
              .trim()
              .toLocaleLowerCase()
              .includes(query.trim().toLocaleLowerCase())
          )
        )
      : setFiltredoffers(offers);
    return setFiltredoffers((e) => e);
  }, [query, offers]);
  //Filter Offers by date
  function filterByDate(e, interval) {
    function dateInterval(interval) {
      const dt = DateTime.now();
      const startOfInterval = dt.startOf(interval);
      const endOfInterval = dt.endOf(interval);
      const i = Interval.fromDateTimes(startOfInterval, endOfInterval);
      setFiltredoffers((e) =>
        e.filter((offer) => {
          const dt = DateTime.fromISO(offer.date).toFormat("yyyy','L','d");
          const dtt = dt.split(",");
          return i.contains(
            DateTime.local(Number(dtt[0]), Number(dtt[1]), Number(dtt[2]))
          );
        })
      );
    }
    if (e.target.checked) {
      dateInterval(interval);
    } else {
      setFiltredoffers(offers);
    }
  }
  // add to & remove from local storage
  function toggelStoredOffer(id) {
    if (storedoffers.includes(id)) {
      toLocalStorage("offers", id, id);
      setStoredOffers((e) => e.filter((e) => e !== id));
    } else {
      toLocalStorage("offers", id);
      setStoredOffers((e) => [...e, id]);
    }
  }
  //show stored offers
  function showStored(e) {
    if (e.target.checked) {
      setisShowStor(true);
      setFiltredoffers(offers.filter((e) => storedoffers.includes(e.id)));
    } else {
      setisShowStor(false);
      setFiltredoffers(offers);
    }
  }

  return (
    <OffersContext.Provider value={value}>{children}</OffersContext.Provider>
  );
}
function useOfferContext() {
  return useContext(OffersContext);
}
export { OffersProvider, useOfferContext };
