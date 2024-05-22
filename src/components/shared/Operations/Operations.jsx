import { createContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from './Search';
import { OrderBy } from './OrderBy';
import { SortBy } from './SortBy';
import { ActionsDropDown } from './ActionsDropDown';
import { Filter } from './Filter';
import { Layout } from './Layout';
import { ShowMore } from './ShowMore';

// Array methods
Array.prototype.customFilter = function (filters, filterCondition) {
  if (!filters) return this;

  const conditions = Object.keys(filters)
    .map((key) => ({
      field: key,
      value: filters[key].filter((v) => v.checked).map((v) => v.value),
    }))
    .filter((c) => c.value.length);

  if (!conditions.length) return this;

  return this.filter((el) => {
    const conditionFn = (c) => {
      let condition = false;
      c.value.forEach((v) => {
        if (v.condition) return (condition = c.value.map((v) => v.condition(el)).some((v) => v));
        condition = c.value.includes(el[c.field]);
      });
      return condition;
    };
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
        ? new Date(a?.[sortBy]) - new Date(b?.[sortBy])
        : new Date(b?.[sortBy]) - new Date(a?.[sortBy]);
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
  const start = 0
  const end = page * limit;

  return this.slice(start, end);
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

export const OperationsContext = createContext();

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
  const [filterCondition, setFilterCondition] = useState('OR');
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

  const appliedFiltersNumber = Object.values(filters)
    .flat()
    .filter((f) => f.checked).length;

  // Clean url
  useEffect(() => {
    if (sortBy === defaultSortBy && direction === defaultDirection) {
      searchParams.delete(sortQueryKey);
      searchParams.delete(directionQueryKey);
    }
    if (!query) searchParams.delete(searchQueryKey);
    if (page === 1) searchParams.delete('page');
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
    setFilters(initialFilters || {});
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
  const onFilter = (filter, reset) => {
    const newFilters = reset ? initialFilters : { ...filters, ...filter };
    setFilters(newFilters);
  };
  const onChangeFilterCondition = () => setFilterCondition((prev) => (prev === 'OR' ? 'AND' : 'OR'));

  const onchangeLayout = (layout) => setLayout(layout);

  const onPaginate = (page) => {
    searchParams.set('page', page);
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
    filters,
    filterCondition,
    appliedFiltersNumber,
    onFilter,
    onChangeFilterCondition,
    layout,
    onchangeLayout,
    page,
    onPaginate,
    totalPages: Math.ceil(data?.length / limit),
  };
  return <OperationsContext.Provider value={context}>{children}</OperationsContext.Provider>;
}

Operations.Search = Search;
Operations.DropDown = ActionsDropDown;
Operations.OrderBy = OrderBy;
Operations.SortBy = SortBy;
Operations.Filter = Filter;
Operations.Layout = Layout;
Operations.ShowMore = ShowMore;
