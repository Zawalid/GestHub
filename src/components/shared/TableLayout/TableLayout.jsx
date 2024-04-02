import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Table } from "./Table";
import { Search } from "./Search";
import { Filter } from "./Filter";
import { View } from "./View";
import { Pagination } from "./Pagination";
import { Download } from "./Download";
import { PAGE_LIMIT } from "../../../utils/constants";
import { TableRecord } from "./TableRecord";
import { FaPlus } from "react-icons/fa6";
import { Button, ConfirmationModal } from "@/components/ui";
import { useTable } from ".";
import { Actions } from "./Actions";

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
  if (!filters) return this;

  const conditions = Object.keys(filters).map((key) => ({
    field: key,
    value: filters[key].filter((v) => v.checked).map((v) => v.value),
  }));

  if (!conditions.length) return this;

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
export function TableLayout({
  children,
  data: tableData,
  isLoading,
  error,
  columns: tableColumns,
  filters: tableFilters,
  formOptions: tableFormOptions,
  confirmOptions: tableConfirmOptions,
  csvConfig,
  pdfConfig,
}) {
  const [data, setData] = useState(tableData);
  const [columns, setColumns] = useState(tableColumns);
  const [filters, setFilters] = useState(
    tableFilters
    // {
    // status: [
    //   { value: "Active", checked: true },
    //   { value: "Inactive", checked: true },
    // ],
    // }
  );
  const [formOptions, setFormOptions] = useState(tableFormOptions);
  const [confirmOptions, setConfirmOptions] = useState(tableConfirmOptions);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sort") || "id";
  const direction = searchParams.get("dir") || "asc";

  const rows = data
    ?.search(query)
    .customFilter(filters)
    .customSort(sortBy, direction);
  const totalItems = rows?.length;
  const totalPages = Math.ceil(totalItems / PAGE_LIMIT);

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  useEffect(() => {
    if (page === 1) searchParams.delete("page");
    if (sortBy === "id" && direction === "asc") {
      searchParams.delete("sort");
      searchParams.delete("dir");
    }
    setSearchParams(searchParams);
  }, [direction, page, searchParams, sortBy, setSearchParams]);

  

  const showForm = (options) => {
    setFormOptions((prev) => ({
      ...prev,
      ...options,
      close: () => {
        setFormOptions((prev) => ({
          ...prev,
          isOpen: false,
          defaultValues: {},
          heading: "",
          submitButtonText: "",
        }));
      },
    }));
  };
  const confirmDelete = (options) => {
    const onCancel = () => {
      setConfirmOptions((prev) => ({
        ...prev,
        isOpen: false,
        message: "",
        title: "",
      }));
    };
    setConfirmOptions((prev) => ({
      ...prev,
      ...options,
      onCancel,
      onConfirm: () => {
        options.onConfirm();
        onCancel();
      },
    }));
  };

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

  const context = {
    // data
    data,
    isLoading,
    error,
    // table
    columns,
    rows: rows?.paginate(page, PAGE_LIMIT),
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
    // download
    csvConfig,
    pdfConfig,
    // other
    formOptions,
    showForm,
    confirmOptions,
    confirmDelete,
  };

  return (
    <TableContext.Provider value={context}>{children}</TableContext.Provider>
  );
}

function NewRecord({ onAdd }) {
  const { showForm, isLoading } = useTable();

  return (
    <Button
      display="with-icon"
      onClick={() =>
        showForm({
          isOpen: true,
          onSubmit: onAdd,
          heading: "Add New Intern",
          submitButtonText: "Add Intern",
          defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            birthday: "",
          },
        })
      }
      disabled={isLoading}
    >
      <FaPlus />
      New Intern
    </Button>
  );
}

function DeleteConfirmation() {
  const { confirmOptions } = useTable();
  return <ConfirmationModal {...confirmOptions} />;
}

TableLayout.Table = Table;
TableLayout.Search = Search;
TableLayout.Filter = Filter;
TableLayout.View = View;
TableLayout.Download = Download;
TableLayout.Pagination = Pagination;
TableLayout.NewRecord = NewRecord;
TableLayout.TableRecord = TableRecord;
TableLayout.DeleteConfirmation = DeleteConfirmation;
TableLayout.Actions = Actions;
