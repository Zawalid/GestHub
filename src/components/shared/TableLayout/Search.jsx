import { SearchInput } from "../../ui";
import { useContext } from "react";
import { TableContext } from "./TableLayout";

//* Search
Array.prototype.search = function (query) {
  if (!query) return this;

  return this.filter((el) => {
    const valueToSearch = `${el?.firstName} ${el?.lastName} ${el?.email}`;

    return valueToSearch
      ?.trim()
      .toLowerCase()
      .includes(query?.trim().toLowerCase());
  });
};

export function Search() {
  const { query, onSearch } = useContext(TableContext);

  return (
    <SearchInput
      placeholder="Search"
      className="flex-1"
      query={query}
      onChange={onSearch}
    />
  );
}
