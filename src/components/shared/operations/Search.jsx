import { SearchInput } from "@/components/ui";
import { useOperations } from "./useOperations";

export function Search({ placeholder, className = "" }) {
  const { query, onSearch,isLoading,error } = useOperations();

  return (
    <SearchInput
      placeholder={placeholder || "Search"}
      className={`flex-1 md:flex-none md:w-[300px] ${className}`}
      query={query}
      onChange={onSearch}
      disabled={isLoading || error}
    />
  );
}
