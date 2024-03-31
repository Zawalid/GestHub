import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Table } from "./Table";
import { Search } from "./Search";
import { Filter } from "./Filter";
import { View } from "./View";
import { Pagination } from "./Pagination";
import { Download } from "./Download";
import { PAGE_LIMIT } from "../../../utils/constants";

const interns = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    gender: "Male",
    birthday: "1990-01-01",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "098-765-4321",
    gender: "Female",
    birthday: "1992-02-02",
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@example.com",
    phone: "111-222-3333",
    gender: "Male",
    birthday: "1993-03-03",
  },
  {
    id: 4,
    firstName: "Alice",
    lastName: "Williams",
    email: "alice.williams@example.com",
    phone: "444-555-6666",
    gender: "Female",
    birthday: "1994-04-04",
  },
  {
    id: 5,
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie.brown@example.com",
    phone: "777-888-9999",
    gender: "Male",
    birthday: "1995-05-05",
  },
  {
    id: 6,
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@example.com",
    phone: "000-111-2222",
    gender: "Female",
    birthday: "1996-06-06",
  },
  {
    id: 7,
    firstName: "Frank",
    lastName: "Miller",
    email: "frank.miller@example.com",
    phone: "333-444-5555",
    gender: "Male",
    birthday: "1997-07-07",
  },
  {
    id: 8,
    firstName: "Grace",
    lastName: "Wilson",
    email: "grace.wilson@example.com",
    phone: "666-777-8888",
    gender: "Female",
    birthday: "1998-08-08",
  },
  {
    id: 9,
    firstName: "Harry",
    lastName: "Moore",
    email: "harry.moore@example.com",
    phone: "999-000-1111",
    gender: "Male",
    birthday: "1999-09-09",
  },
  {
    id: 10,
    firstName: "Ivy",
    lastName: "Taylor",
    email: "ivy.taylor@example.com",
    phone: "222-333-4444",
    gender: "Female",
    birthday: "2000-10-10",
  },
];

//* Methods
Array.prototype.search = function (query) {
  if (!query) return this;

  return this.filter((el) => {
    const valueToSearch = `${el?.firstName} ${el?.lastName} ${el?.email}`;

    return valueToSearch
      ?.trim()
      .toLowerCase()
      .includes(query?.trim().toLowerCase());
  });
};

Array.prototype.paginate = function (page, limit) {
  const start = (page - 1) * limit;
  const end = page * limit;

  return this.slice(start, end);
};

Array.prototype.customFilter = function (filters) {
  const conditions = Object.keys(filters).map((key) => ({
    field: key,
    value: filters[key].filter((v) => v.checked).map((v) => v.value),
  }));

  return this.filter((el) =>
    conditions.some((c) => c.value.includes(el[c.field]))
  );
};

Array.prototype.customSort = function (sortBy, direction) {
  return this.toSorted((a, b) => {
    const stringFields = ["firstName", "lastName", "email", "phone", "gender"];
    if (stringFields.includes(sortBy))
      return direction === "asc"
        ? a[sortBy].localeCompare(b[sortBy])
        : b[sortBy].localeCompare(a[sortBy]);

    if (sortBy === "id") return direction === "asc" ? a.id - b.id : b.id - a.id;

    if (sortBy === "birthday")
      return direction === "asc"
        ? new Date(a.birthday) - new Date(b.birthday)
        : new Date(b.birthday) - new Date(a.birthday);
  });
};

export const TableContext = createContext();
export function TableLayout({ children }) {
  const [columns, setColumns] = useState([
    { label: "id", visible: true },
    { label: "First Name", visible: true },
    { label: "Last Name", visible: true },
    { label: "Email", visible: true },
    { label: "Phone", visible: true },
    { label: "Gender", visible: true },
    { label: "Birthday", visible: true },
  ]);
  const [filters, setFilters] = useState({
    gender: [
      { value: "Male", checked: true },
      { value: "Female", checked: true },
    ],
    status: [
      { value: "Active", checked: true },
      { value: "Inactive", checked: true },
    ],
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sort") || "id";
  const direction = searchParams.get("dir") || "asc";

  const rows = interns
    ?.search(query)
    .customFilter(filters)
    .customSort(sortBy, direction);
  const totalItems = rows.length;
  const totalPages = Math.ceil(totalItems / PAGE_LIMIT);

  useEffect(() => {
    if (page === 1) searchParams.delete("page");
    if (sortBy === "id" && direction === "asc") {
      searchParams.delete("sort");
      searchParams.delete("dir");
    }
    setSearchParams(searchParams);
  }, [direction, page, searchParams, sortBy, setSearchParams]);

  const onSearch = (query) => {
    if (query) {
      searchParams.set("search", query);
      searchParams.delete("page");
    } else searchParams.delete("s");

    setSearchParams(searchParams);
  };

  const onNextPage = () => {
    if (page === totalPages) return;
    searchParams.set("page", page + 1);
    setSearchParams(searchParams);
  };

  const onPrevPage = () => {
    if (page === 1) return;
    searchParams.set("page", page - 1);
    setSearchParams(searchParams);
  };

  const onFilter = (filter) => setFilters((prev) => ({ ...prev, ...filter }));

  const onChangeView = (column) => {
    setColumns(
      columns.map((c) =>
        c.label === column ? { ...c, visible: !c.visible } : c
      )
    );
  };

  const onSort = (column, direction) => {
    searchParams.set("sort", column);
    searchParams.set("dir", direction);
    setSearchParams(searchParams);
  };

  return (
    <TableContext.Provider
      value={{
        // table
        columns,
        rows: rows.paginate(page, PAGE_LIMIT),
        // search
        query,
        onSearch,
        // pagination
        totalItems,
        totalPages,
        page,
        onNextPage,
        onPrevPage,
        // filter
        filters,
        onFilter,
        // view
        onChangeView,
        // sort
        sortBy,
        direction,
        onSort,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

TableLayout.Table = Table;
TableLayout.Search = Search;
TableLayout.Filter = Filter;
TableLayout.View = View;
TableLayout.Download = Download;
TableLayout.Pagination = Pagination;
