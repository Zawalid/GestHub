import { createContext, useState } from "react";
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
    ID: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    gender: "Male",
    birthday: "1990-01-01",
  },
  {
    ID: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "098-765-4321",
    gender: "Female",
    birthday: "1992-02-02",
  },
  {
    ID: "3",
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@example.com",
    phone: "111-222-3333",
    gender: "Male",
    birthday: "1993-03-03",
  },
  {
    ID: "4",
    firstName: "Alice",
    lastName: "Williams",
    email: "alice.williams@example.com",
    phone: "444-555-6666",
    gender: "Female",
    birthday: "1994-04-04",
  },
  {
    ID: "5",
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie.brown@example.com",
    phone: "777-888-9999",
    gender: "Male",
    birthday: "1995-05-05",
  },
  {
    ID: "6",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@example.com",
    phone: "000-111-2222",
    gender: "Female",
    birthday: "1996-06-06",
  },
  {
    ID: "7",
    firstName: "Frank",
    lastName: "Miller",
    email: "frank.miller@example.com",
    phone: "333-444-5555",
    gender: "Male",
    birthday: "1997-07-07",
  },
  {
    ID: "8",
    firstName: "Grace",
    lastName: "Wilson",
    email: "grace.wilson@example.com",
    phone: "666-777-8888",
    gender: "Female",
    birthday: "1998-08-08",
  },
  {
    ID: "9",
    firstName: "Harry",
    lastName: "Moore",
    email: "harry.moore@example.com",
    phone: "999-000-1111",
    gender: "Male",
    birthday: "1999-09-09",
  },
  {
    ID: "10",
    firstName: "Ivy",
    lastName: "Taylor",
    email: "ivy.taylor@example.com",
    phone: "222-333-4444",
    gender: "Female",
    birthday: "2000-10-10",
  },
];

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

export const TableContext = createContext();
export function TableLayout({ children }) {
  const [columns, setColumns] = useState([
    { key: "ID", label: "ID", visible: true },
    { key: "firstName", label: "First Name", visible: true },
    { key: "lastName", label: "Last Name", visible: true },
    { key: "email", label: "Email", visible: true },
    { key: "phone", label: "Phone", visible: true },
    { key: "gender", label: "Gender", visible: true },
    { key: "birthday", label: "Birthday", visible: true },
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
  const query = searchParams.get("s") || "";
  const page = Number(searchParams.get("page")) || 1;

  const rows = interns?.search(query).customFilter(filters);
  const totalItems = rows.length;
  const totalPages = Math.ceil(totalItems / PAGE_LIMIT);

  const onSearch = (query) => {
    if (query) {
      searchParams.set("s", query);
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

  const onChangeView = (columns) => setColumns(columns);

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
