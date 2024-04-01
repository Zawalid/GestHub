const ofers = [
  {
    exp: "Expert",
    secteur: "devloppemnt",
    title: "devlopper backend",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perferendis et quam nostrum assumenda, consequuntur cum suscipit ut aliquam, possimus, harum ullam repellat animi rem iste ex ipsam inventore porro.",
    date: "12/12/2023",
    ville: "rabat",
  },
  {
    exp: "intermediate",
    secteur: "devloppemnt",
    title: "devlopper frontend",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perferendis et quam nostrum assumenda, consequuntur cum suscipit ut aliquam, possimus, harum ullam repellat animi rem iste ex ipsam inventore porro.",
    date: "12/12/2023",
    ville: "sale",
  },
  {
    exp: "debutant",
    secteur: "devops",
    title: "engineer devops",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perferendis et quam nostrum assumenda, consequuntur cum suscipit ut aliquam, possimus, harum ullam repellat animi rem iste ex ipsam inventore porro.",
    date: "12/12/2023",
    ville: "rabat",
  },
  {
    exp: "Expert",
    secteur: "testing",
    title: "testeur ",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perferendis et quam nostrum assumenda, consequuntur cum suscipit ut aliquam, possimus, harum ullam repellat animi rem iste ex ipsam inventore porro.",
    date: "12/12/2023",
    ville: "rabat",
  },
];
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { createContext, useContext } from "react";
const OffersContext = createContext();

function OffersProvider({ children }) {
  const [offers, setOffers] = useState(ofers);
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
  }, [filterdSect, filterdExp]);
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

  return (
    <OffersContext.Provider value={value}>{children}</OffersContext.Provider>
  );
}
function useOffer() {
  return useContext(OffersContext);
}
export { OffersProvider, useOffer };
