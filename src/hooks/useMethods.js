import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PAGE_LIMIT } from '@/utils/constants';
import { getIsoDate } from '@/utils/helpers';

Array.prototype.customFilter = function (filters, filterCondition) {
  if (!filters) return this;

  const conditions = Object.entries(filters)
    .map(([field, filter]) => ({
      field,
      value: filter.filter(({ checked }) => checked).map(({ value }) => value),
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

Array.prototype.paginate = function (page, limit) {
  const start = (page - 1) * limit;
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

export const useMethods = ({
  defaultSortBy = 'id',
  defaultDirection = 'desc',
  defaultFilters = {},
  keys = {
    paginationKey: 'page',
    searchKey: 'search',
    sortKey: 'sort',
    directionKey: 'dir',
    limitKey: 'limit',
  },
}) => {
  const [filters, setFilters] = useState(defaultFilters);
  const [searchParams, setSearchParams] = useSearchParams();

  const { paginationKey, searchKey, sortKey, directionKey, limitKey } = keys;

  const query = searchParams.get(searchKey) || '';
  const page = Number(searchParams.get(paginationKey)) || 1;
  const limit = Number(searchParams.get(limitKey)) || PAGE_LIMIT;
  const sortBy = searchParams.get(sortKey) || defaultSortBy;
  const direction = searchParams.get(directionKey) || defaultDirection;

  // useEffect(() => {
  //   setFilters((prev) => {
  //     const updated = {};
  //     Object.keys(prev).forEach((key) => {
  //       updated[key] = prev[key].map((f) => ({
  //         ...f,
  //         checked: f.checked || false,
  //       }));
  //     });
  //     return updated;
  //   });
  // }, [defaultFilters]);

  // Clean up the URL
  useEffect(() => {
    if (page === 1) searchParams.delete(keys.paginationKey);
    if (sortBy === defaultSortBy && direction === defaultDirection) {
      searchParams.delete(sortKey);
      searchParams.delete(directionKey);
    }
    if (!query) searchParams.delete(searchKey);
    setSearchParams(searchParams);
  }, [
    direction,
    page,
    searchParams,
    sortBy,
    query,
    setSearchParams,
    defaultSortBy,
    defaultDirection,
    keys.paginationKey,
    searchKey,
    sortKey,
    directionKey,
  ]);

  // Handlers

  const set = () => setSearchParams(searchParams);

  const onSearch = (query) => {
    searchParams.set('search', query);
    searchParams.delete('page');
    set();
  };

  const onPaginate = (page) => {
    searchParams.set('page', page);
    set();
  };

  const onChangeLimit = (limit) => {
    searchParams.set('limit', limit);
    set();
  };

  const onSort = (column, direction) => {
    searchParams.set('sort', column);
    if (direction) searchParams.set('dir', direction);
    set();
  };

  const onOrder = (direction) => {
    searchParams.set('dir', direction);
    set();
  };

  const onFilter = (key, value, reset) => {
    if (reset) return setFilters(defaultFilters);
    const updatedFilters = {
      ...filters,
      [key]: filters[key].map((f) => (f.value === value ? { ...f, checked: !f.checked } : f)),
    };
    setFilters(updatedFilters);

    if (page !== 1) onPaginate(1);
  };

  const appliedFiltersNumber = (filter) => {
    if (filter === 'all')
      return Object.values(filters)
        .flat()
        .filter((f) => f.checked).length;

    if (!filters[filter]) return;

    return Object.values(filters[filter])
      .flat()
      .filter((f) => f.checked).length;
  };

  return {
    query,
    page,
    limit,
    sortBy,
    direction,
    filters,
    onSearch,
    onPaginate,
    onChangeLimit,
    onOrder,
    onSort,
    onFilter,
    appliedFiltersNumber,
  };
};
