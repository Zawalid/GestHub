/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from './Search';
import { OrderBy } from './OrderBy';
import { SortBy } from './SortBy';
import { ActionsDropDown } from './ActionsDropDown';
import { Filter } from './Filter';
import { Layout } from './Layout';
import { ViewMore } from './ViewMore';
import { OperationsContext } from './useOperations';
import { getIsoDate } from '@/utils/helpers';

// Array methods
Array.prototype.customFilter = function (filters, filterCondition) {
  if (!filters) return this;

  const conditions = Object.entries(filters)
    .map(([field, filter]) => ({
      field,
      value: (filter).filter(({ checked }) => checked).map(({ value }) => value),
    }))
    .filter(({ value }) => value.length);

  if (!conditions.length) return this;

  return this.filter((el) => {
    const conditionFn = (c) =>
      c.value.some((val) => (val.condition ? val.condition(el) : c.value.includes(el[c.field])));
    return filterCondition === 'AND' ? conditions.every(conditionFn) : conditions.some(conditionFn);
  });
};

Array.prototype.customSort = function (sortBy, direction, sortOptions) {
  if (!sortOptions) return this;

  const stringFields = sortOptions.filter((c) => c.type === 'string').map((c) => c.key);
  const numberFields = sortOptions.filter((c) => c.type === 'number').map((c) => c.key);
  const dateFields = sortOptions.filter((c) => c.type === 'date').map((c) => c.key);
  const customFields = sortOptions.filter((c) => c.type === 'custom').map((c) => c.key);

  return this.toSorted((a, b) => {
    if (numberFields.includes(sortBy))
      return direction === 'asc' ? a?.[sortBy] - b?.[sortBy] : b?.[sortBy] - a?.[sortBy];

    if (stringFields.includes(sortBy)) {
      return direction === 'asc' ? a?.[sortBy]?.localeCompare(b?.[sortBy]) : b?.[sortBy]?.localeCompare(a?.[sortBy]);
    }

    if (dateFields.includes(sortBy)) {
      return direction === 'asc'
        ? getIsoDate(a?.[sortBy]) - getIsoDate(b?.[sortBy])
        : getIsoDate(b?.[sortBy]) - getIsoDate(a?.[sortBy]);
    }

    if (customFields.includes(sortBy)) return sortOptions.find((c) => c.key === sortBy)?.fn(a, b, direction);
  });
};

Array.prototype.search = function (query, fieldsToSearch) {
  if (!query || !fieldsToSearch) return this;

  return this.filter((el) => {
    const valueToSearch = fieldsToSearch.map((field) => el[field]).join(' ');
    return valueToSearch?.trim().toLowerCase().includes(query?.trim().toLowerCase());
  });
};

Array.prototype.customPaginate = function (page, limit) {
  const end = page * limit;
  return this.slice(0, end);
};

export const getAppliedFiltersNumber = (filters) => (filter) => {
  if (filter === 'all')
    return Object.values(filters)
      .flat()
      .filter((f) => f.checked).length;

  if (!filters[filter]) return;

  return Object.values(filters[filter])
    .flat()
    .filter((f) => f.checked).length;
};

export const onFilter = (filters, setFilters, initialFilters) => (key, value, reset) => {
  if (reset) return setFilters(initialFilters);

  const filter = (filters[key]).map((f) =>
    f.value === value ? { ...f, checked: !f.checked } : f
  );
  setFilters({ ...filters, [key]: filter });
};

// const constructFilterString = (filters) => {
//   let filterString = "";

//   Object.keys(filters).forEach((key) => {
//     const checkedFilters = filters[key]
//       .filter(({ checked }) => checked)
//       .map(({ value }) => value)
//       .join(",");

//     if (checkedFilters)
//       filterString = `${
//         filterString ? filterString + "&" : ""
//       }${key}=${checkedFilters}`;
//   });

//   return filterString;
// };

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
  searchQueryKey = 'search',
  sortQueryKey = 'sort',
  directionQueryKey = 'dir',
  showAll = false,
  limit = 10,
}) {
  const [filters, setFilters] = useState(initialFilters || {});
  const [filterCondition, setFilterCondition] = useState('AND');
  const [layout, setLayout] = useState(defaultLayout, 'grid');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(searchQueryKey);
  const sortBy = searchParams.get(sortQueryKey) || defaultSortBy;
  const direction = searchParams.get(directionQueryKey) || defaultDirection;
  const page = Number(searchParams.get('p')) || 1;

  const data = initialData
    ?.search(query, fieldsToSearch)
    .customFilter(filters, filterCondition)
    .customSort(sortBy, direction, sortOptions);

  // Clean url
  useEffect(() => {
    if (sortBy === defaultSortBy && direction === defaultDirection) {
      searchParams.delete(sortQueryKey);
      searchParams.delete(directionQueryKey);
    }
    if (!query) searchParams.delete(searchQueryKey);
    if (page === 1) searchParams.delete('p');
    setSearchParams(searchParams);
  }, [
    direction,
    searchParams,
    sortBy,
    query,
    setSearchParams,
    defaultDirection,
    defaultSortBy,
    searchQueryKey,
    sortQueryKey,
    directionQueryKey,
    page,
  ]);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // Perform operations

  const onSearch = (query) => {
    searchParams.set(searchQueryKey, query);
    setSearchParams(searchParams);
  };
  const onSort = (key) => {
    searchParams.set(sortQueryKey, key);
    setSearchParams(searchParams);
  };
  const onOrder = (direction) => {
    searchParams.set(directionQueryKey, direction);
    setSearchParams(searchParams);
  };

  const onChangeFilterCondition = () => setFilterCondition((prev) => (prev === 'OR' ? 'AND' : 'OR'));

  const onchangeLayout = (layout) => setLayout(layout);

  const onPaginate = (page) => {
    searchParams.set('p', page);
    setSearchParams(searchParams);
  };

  const context = {
    data: showAll ? data : data?.customPaginate(page, limit),
    isLoading,
    error,
    disabled: isLoading || error || initialData?.length === 0,
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
    appliedFiltersNumber: getAppliedFiltersNumber(filters),
    onFilter: onFilter(filters, setFilters, initialFilters),
    onChangeFilterCondition,
    layout,
    onchangeLayout,
    page,
    onPaginate,
    totalPages: Math.ceil(data?.length / limit),
    limit,
  };
  return <OperationsContext.Provider value={context}>{children}</OperationsContext.Provider>;
}

Operations.Search = Search;
Operations.DropDown = ActionsDropDown;
Operations.OrderBy = OrderBy;
Operations.SortBy = SortBy;
Operations.Filter = Filter;
Operations.Layout = Layout;
Operations.ViewMore = ViewMore;
