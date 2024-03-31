import { SearchInput } from "../../ui";
import { useContext } from "react";
import { TableContext } from "./TableLayout";


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
