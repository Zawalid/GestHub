import { createContext } from "react";
import { useSearchParams } from "react-router-dom";
import { Table } from "./Table";
import { Search } from "./Search";
import { Filter } from "./Filter";
import { View } from "./View";
import { Pagination } from "./Pagination";
import { Download } from "./Download";

const interns = [
  {
    ID: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    sex: "Male",
    birthday: "1990-01-01",
  },
  {
    ID: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "098-765-4321",
    sex: "Female",
    birthday: "1992-02-02",
  },
  {
    ID: "3",
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@example.com",
    phone: "111-222-3333",
    sex: "Male",
    birthday: "1993-03-03",
  },
  {
    ID: "4",
    firstName: "Alice",
    lastName: "Williams",
    email: "alice.williams@example.com",
    phone: "444-555-6666",
    sex: "Female",
    birthday: "1994-04-04",
  },
  {
    ID: "5",
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie.brown@example.com",
    phone: "777-888-9999",
    sex: "Male",
    birthday: "1995-05-05",
  },
  {
    ID: "6",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@example.com",
    phone: "000-111-2222",
    sex: "Female",
    birthday: "1996-06-06",
  },
  {
    ID: "7",
    firstName: "Frank",
    lastName: "Miller",
    email: "frank.miller@example.com",
    phone: "333-444-5555",
    sex: "Male",
    birthday: "1997-07-07",
  },
  {
    ID: "8",
    firstName: "Grace",
    lastName: "Wilson",
    email: "grace.wilson@example.com",
    phone: "666-777-8888",
    sex: "Female",
    birthday: "1998-08-08",
  },
  {
    ID: "9",
    firstName: "Harry",
    lastName: "Moore",
    email: "harry.moore@example.com",
    phone: "999-000-1111",
    sex: "Male",
    birthday: "1999-09-09",
  },
  {
    ID: "10",
    firstName: "Ivy",
    lastName: "Taylor",
    email: "ivy.taylor@example.com",
    phone: "222-333-4444",
    sex: "Female",
    birthday: "2000-10-10",
  },
];

export const TableContext = createContext();

const LIMIT = 5

export function TableLayout({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("s") || "";
  const page = Number(searchParams.get("page")) || 1;

  const rows = interns?.search(query).paginate(page, LIMIT);
  const totalItems = interns?.search(query).length;
  const totalPages = Math.ceil(totalItems / LIMIT);

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

  return (
    <TableContext.Provider
      value={{
        // table
        columns: [
          "ID",
          "First Name",
          "Last Name",
          "Email",
          "Phone",
          "Sex",
          "Birthday",
        ],
        rows,
        // search
        query,
        onSearch,
        // pagination
        totalItems,
        totalPages,
        page,
        limit: LIMIT,
        onNextPage,
        onPrevPage,
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
