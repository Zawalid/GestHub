import { SearchInput } from "../../ui";
import { useTable } from ".";

export function Search() {
  const { query, onSearch,isLoading } = useTable();

  return (
    <SearchInput
      placeholder="Search"
      className="flex-1"
      query={query}
      onChange={onSearch}
      disabled={isLoading}
    />
  );
}
