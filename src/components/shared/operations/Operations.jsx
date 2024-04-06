import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "./Search";
import { OrderBy } from "./OrderBy";
import { SortBy } from "./SortBy";
import { DropDown } from "./DropDown";
import { Filter } from "./Filter";
import { Layout } from "./Layout";

// Array methods
Array.prototype.customFilter = function (filters) {
  if (!filters) return this;

  const conditions = Object.keys(filters)
    .map((key) => ({
      field: key,
      value: filters[key].filter((v) => v.checked).map((v) => v.value),
    }))
    .filter((c) => c.value.length);

  if (!conditions.length) return this;

  return this.filter((el) =>
    conditions.some((c) => c.value.includes(el[c.field]))
  );
};

Array.prototype.customSort = function (sortBy, direction, sortOptions) {
  const stringFields = sortOptions
    .filter((c) => c.type === "string")
    .map((c) => c.key);
  const numberFields = sortOptions
    .filter((c) => c.type === "number")
    .map((c) => c.key);
  const dateFields = sortOptions
    .filter((c) => c.type === "date")
    .map((c) => c.key);

  return this.toSorted((a, b) => {
    if (numberFields.includes(sortBy))
      return direction === "asc"
        ? a?.[sortBy] - b?.[sortBy]
        : b?.[sortBy] - a?.[sortBy];

    if (stringFields.includes(sortBy)) {
      return direction === "asc"
        ? a?.[sortBy].localeCompare(b?.[sortBy])
        : b?.[sortBy].localeCompare(a?.[sortBy]);
    }

    if (dateFields.includes(sortBy)) {
      return direction === "asc"
        ? new Date(a?.[sortBy]) - new Date(b?.[sortBy])
        : new Date(b?.[sortBy]) - new Date(a?.[sortBy]);
    }
  });
};

Array.prototype.search = function (query, fieldsToSearch) {
  if (!query || !fieldsToSearch) return this;

  return this.filter((el) => {
    const valueToSearch = fieldsToSearch.map((field) => el[field]).join(" ");
    return valueToSearch
      ?.trim()
      .toLowerCase()
      .includes(query?.trim().toLowerCase());
  });
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
}) {
  const [filters, setFilters] = useState(initialFilters || {});
  const [layout, setLayout] = useState(defaultLayout, "grid");

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const sortBy = searchParams.get("sort") || defaultSortBy;
  const direction = searchParams.get("dir") || defaultDirection;

  const data = initialData
    ?.search(query, fieldsToSearch)
    .customFilter(filters)
    .customSort(sortBy, direction, sortOptions);

  const appliedFiltersNumber = Object.values(filters)
    .flat()
    .filter((f) => f.checked).length;

  // Clean url
  useEffect(() => {
    if (sortBy === defaultSortBy && direction === defaultDirection) {
      searchParams.delete("sort");
      searchParams.delete("dir");
    }
    if (!query) searchParams.delete("search");
    setSearchParams(searchParams);
  }, [
    direction,
    searchParams,
    sortBy,
    query,
    setSearchParams,
    defaultDirection,
    defaultSortBy,
  ]);

  // Perform operations

  const onSearch = (query) => {
    searchParams.set("search", query);
    setSearchParams(searchParams);
  };
  const onSort = (key) => {
    searchParams.set("sort", key);
    setSearchParams(searchParams);
  };
  const onOrder = (direction) => {
    searchParams.set("dir", direction);
    setSearchParams(searchParams);
  };
  const onFilter = (filter, reset) => {
    const newFilters = reset ? initialFilters : { ...filters, ...filter };
    setFilters(newFilters);
  };
  const onchangeLayout = (layout) => setLayout(layout);

  const context = {
    data,
    isLoading,
    error,
    query,
    onSearch,
    sortBy,
    sortOptions,
    onSort,
    direction,
    onOrder,
    filters,
    appliedFiltersNumber,
    onFilter,
    layout,
    onchangeLayout,
  };
  return (
    <OperationsContext.Provider value={context}>
      {children}
    </OperationsContext.Provider>
  );
}

Operations.Search = Search;
Operations.DropDown = DropDown;
Operations.OrderBy = OrderBy;
Operations.SortBy = SortBy;
Operations.Filter = Filter;
Operations.Layout = Layout;
