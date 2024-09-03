/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react';
import { Search } from './Search';
import { Sort } from './Sort';
import { Filter } from './Filter';
import { Layout } from './Layout';
import { Pagination } from './Pagination';
import { OperationsContext } from './useOperations';
import { Status } from '@/components/ui';
import { useMethods } from '@/hooks/useMethods';


export const renderData = ({
  isLoading,
  error,
  appliedFiltersNumber,
  query,
  page,
  totalPages,
  render,
  skeleton,
  data,
}) => {
  if (isLoading) return skeleton;
  if (error) return <Status status='error' heading={error.message} message='Please try again later' />;
  if (page > totalPages && !query && !appliedFiltersNumber('all')) return <Status status='pageNotFound' />;
  if (data?.length === 0 && (query || appliedFiltersNumber('all')))
    return <Status status='noResults' heading='No offers found' message='Try changing your search query or filters' />;
  return render();
};



/**
 * Operations component.
 *
 * @component
 *
 * @param {Object} props - Props that get passed to the Operations component.
 * @param {React.ReactNode} props.children - The children nodes of the Operations component.
 * @param {Array} props.data - The initial data for the Operations component.
 * @param {boolean} props.isLoading - If true, the Operations component is in a loading state.
 * @param {Object} props.error - The error object, if any error occurred.
 * @param {Array} props.sortOptions - The options for sorting the data.
 * @param {string} props.defaultSortBy - The default field to sort the data by.
 * @param {string} props.defaultDirection - The default direction to sort the data in.
 * @param {Object} props.filters - The initial filters for the Operations component.
 * @param {string} props.defaultLayout - The default layout for the Operations component.
 * @param {Array} props.fieldsToSearch - The fields to search the data in.
 * @param {string} paginationKey - The key used for pagination. Default is 'page'.
 * @param {string} searchKey - The key used for search queries. Default is 'search'.
 * @param {string} sortKey - The key used for sorting queries. Default is 'sort'.
 * @param {string} directionKey - The key used for direction queries. Default is 'dir'.
 * @param {boolean} showAll - Flag to indicate if all items should be shown. Default is false.
 *
 * @returns {React.ElementType} Returns a OperationsContext.Provider component with the Operations component.
 */
export function Operations({
  children,
  data: initialData,
  isLoading,
  error,
  sortOptions,
  defaultSortBy,
  defaultDirection,
  filters: initialFilters,
  defaultLayout,
  fieldsToSearch,
  paginationKey = 'page',
  limitKey = 'limit',
  searchKey = 'search',
  sortKey = 'sort',
  directionKey = 'dir',
  showAll = false,
}) {
  const [filterCondition, setFilterCondition] = useState('AND');
  const [layout, setLayout] = useState(defaultLayout, 'grid');

  const {
    query,
    page,
    limit,
    sortBy,
    direction,
    filters,
    onSearch,
    onPaginate,
    onChangeLimit,
    onSort,
    onOrder,
    onFilter,
    setFilters,
    appliedFiltersNumber,
  } = useMethods({
    defaultSortBy,
    defaultDirection,
    defaultFilters: initialFilters,
    keys: { paginationKey, searchKey, sortKey, directionKey, limitKey },
  });

  const data = initialData
    ?.search(query, fieldsToSearch)
    .customFilter(filters, filterCondition)
    .customSort(sortBy, direction, sortOptions);

  const totalItems = data?.length;
  const totalPages = Math.ceil(totalItems / limit);



  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters, setFilters]);

  // Perform operations

  const onChangeFilterCondition = () => setFilterCondition((prev) => (prev === 'OR' ? 'AND' : 'OR'));

  const onchangeLayout = (layout) => setLayout(layout);

  const context = {
    initialData,
    data: showAll ? data : data?.paginate(page, limit),
    isLoading,
    error,
    disabled: isLoading || error || initialData?.length === 0 || (page > totalPages && !query && !appliedFiltersNumber('all')),
    query,
    onSearch,
    sortBy,
    sortOptions,
    onSort,
    direction,
    onOrder,
    initialFilters,
    filters,
    filterCondition,
    appliedFiltersNumber,
    onFilter,
    onChangeFilterCondition,
    layout,
    onchangeLayout,
    page,
    totalPages,
    totalItems,
    limit,
    onChangeLimit,
    onPaginate,
  };
  return <OperationsContext.Provider value={context}>{children}</OperationsContext.Provider>;
}

Operations.Search = Search;
Operations.Sort = Sort;
Operations.Filter = Filter;
Operations.Layout = Layout;
Operations.Pagination = Pagination;
