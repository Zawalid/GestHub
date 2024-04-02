const ofers = [
  {
    id: 1,
    exp: "Expert",
    secteur: "devloppemnt",
    title: "devlopper backend",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perferendis et quam nostrum assumenda, consequuntur cum suscipit ut aliquam, possimus, harum ullam repellat animi rem iste ex ipsam inventore porro.",
    date: new Date(2024, 3, 2),
    ville: "rabat",
  },
  {
    id: 3,
    exp: "intermediate",
    secteur: "devloppemnt",
    title: "devlopper frontend",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perferendis et quam nostrum assumenda, consequuntur cum suscipit ut aliquam, possimus, harum ullam repellat animi rem iste ex ipsam inventore porro.",
    date: new Date(2024, 3, 4),
    ville: "sale",
  },
  {
    id: 4,
    exp: "debutant",
    secteur: "devops",
    title: "engineer devops",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perferendis et quam nostrum assumenda, consequuntur cum suscipit ut aliquam, possimus, harum ullam repellat animi rem iste ex ipsam inventore porro.",
    date: new Date(2024, 3, 30),
    ville: "rabat",
  },
  {
    id: 5,
    exp: "Expert",
    secteur: "testing",
    title: "testeur ",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perferendis et quam nostrum assumenda, consequuntur cum suscipit ut aliquam, possimus, harum ullam repellat animi rem iste ex ipsam inventore porro.",
    date: new Date(2024, 8, 2),
    ville: "Casablanca",
  },
];
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { createContext, useContext } from "react";
import { toLocalStorage } from "@/hooks/useLocalStorageState";
const OffersContext = createContext();

function OffersProvider({ children }) {
  const [offers, setOffers] = useState(ofers);
  const [storedoffers, setStoredOffers] = useState(
    toLocalStorage("offers").items
  );
  const [isShowStor, setisShowStor] = useState(false);
  const secteurs = new Set(ofers.map((e) => e.secteur));
  const exp = new Set(ofers.map((e) => e.exp));
  const [filterdSect, setFilterdSect] = useState([]);
  const [filterdExp, setFilterdExp] = useState([]);
  const [selectAllSect, setselectAllSect] = useState(false);
  const [selectAllexp, setselectAllexp] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const value = {
    offers,
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
      setOffers(ofers);
    }
    if (filterdSect.length == 0) {
      setOffers(ofers);
    }
    if (filterdExp.length > 0 && filterdSect.length == 0) {
      setOffers(ofers.filter((e) => filterdExp.includes(e.exp)));
    }
    if (filterdSect.length > 0 && filterdExp.length == 0) {
      setOffers(ofers.filter((e) => filterdSect.includes(e.secteur)));
    }
    if (filterdSect.length > 0 && filterdExp.length > 0) {
      setOffers(
        ofers.filter(
          (e) => filterdSect.includes(e.secteur) && filterdExp.includes(e.exp)
        )
      );
    }
  }, [filterdSect, filterdExp, isShowStor]);
  //search effect
  useEffect(() => {
    query.length > 2
      ? setOffers((e) =>
          e.filter((e) =>
            (e.title + e.description)
              .trim()
              .toLocaleLowerCase()
              .includes(query.trim().toLocaleLowerCase())
          )
        )
      : setOffers(ofers);
    return setOffers((e) => e);
  }, [query]);
  //Filter Offers by date
  function filterByDate(e, date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date === "today" && e.target.checked) {
      setOffers((e) =>
        e.filter((offer) => offer.date.getTime() === today.getTime())
      );
    } else if (date === "thisWeek" && e.target.checked) {
      today.setDate(today.getDate() - today.getDay());
      const weekEnd = new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000);
      setOffers((e) =>
        e.filter(
          (offer) =>
            offer.date.getTime() >= today && offer.date.getTime() <= weekEnd
        )
      );
    } else if (date === "thisMonth" && e.target.checked) {
        setOffers((e) =>
        e.filter(
          (offer) =>
            offer.date.getFullYear() === today.getFullYear() &&
            offer.date.getMonth() === today.getMonth()
        )
      );
    } else {
        setOffers(ofers);
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
      setOffers(ofers.filter((e) => storedoffers.includes(e.id)));
    } else {
      setisShowStor(false);
      setOffers(ofers);
    }
  }

  return (
    <OffersContext.Provider value={value}>{children}</OffersContext.Provider>
  );
}
function useOffer() {
  return useContext(OffersContext);
}
export { OffersProvider, useOffer };
