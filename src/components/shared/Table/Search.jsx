import { SearchInput } from "../../ui";
import { useTable } from "./useTable";

export function Search() {
  const { query, onSearch, disabled } = useTable();

  return (
    <SearchInput
      placeholder="Search"
      className="flex-1 md:w-[300px]"
      query={query}
      onChange={onSearch}
      disabled={disabled}
    />
  );
}
