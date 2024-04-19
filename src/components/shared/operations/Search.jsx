import { SearchInput } from '@/components/ui';
import { useOperations } from './useOperations';

export function Search({ placeholder, className = '' }) {
  const { query, onSearch, isLoading, error } = useOperations();

  return (
    <SearchInput
      placeholder={placeholder || 'Search'}
      className={`flex-1 md:w-[300px] md:flex-none ${className}`}
      query={query}
      onChange={onSearch}
      disabled={isLoading || Boolean(error)}
    />
  );
}
