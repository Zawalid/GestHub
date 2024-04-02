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
import { ConfirmationModal } from "@/components/ui";
import { useTable } from ".";
import { Actions } from "./Actions";
import { NewRecord } from "./NewRecord";

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

Array.prototype.customSort = function (sortBy, direction, columns) {
  const stringFields = columns
    .filter((c) => c.type === "string")
    .map((c) => c.key);
  const numberFields = columns
    .filter((c) => c.type === "number")
    .map((c) => c.key);
  const dateFields = columns.filter((c) => c.type === "date").map((c) => c.key);

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
        ? new Date(a.birthday) - new Date(b.birthday)
        : new Date(b.birthday) - new Date(a.birthday);
    }
  });
};

export const TableContext = createContext();

//* Props descriptions and examples
/**
 * @property {Array} tableData - The data to be displayed in the table. @example: ?.[{ id: 1, firstName: 'John',... }, {...}]
 * @property {string} resourceName - The name of the resource being displayed. @example: "Users"
 * @property {boolean} isLoading - A flag indicating if the data is currently being loaded.
 * @property {Error} [error] - An error object, if an error occurred while loading the data.
 * @property {Array} tableColumns - The columns to be displayed in the table. 
 *    @example: [{ key: "id", displayLabel: "ID", visible: true,type : "number" },{...}]
 * @property {Object} tableFilters - The filters to be applied to the table data.
 *     @example: { status: [{ value: "Active", checked: true },{ value: "Inactive", checked: true },{...} ],
 * @property {Array} formFields - The fields to be displayed in the form. 
 *    @example: [{ name: "lastName", label: "Last Name" },{  name: "email",  type: "email",  label: "Email Address"},{...}]
 * @property {Object} downloadOptions - The options for downloading the table data. 
 *    @example: {csvFileName: "Interns-csv", pdfFileName: "Interns"}

 */

export function TableProvider({
  children,
  data: tableData,
  resourceName,
  isLoading,
  error,
  columns: tableColumns,
  filters: tableFilters,
  formFields,
  downloadOptions,
}) {
  // State
  const [data, setData] = useState(tableData);
  const [columns, setColumns] = useState(tableColumns);
  const [filters, setFilters] = useState(tableFilters);
  const [formOptions, setFormOptions] = useState({
    defaultValues: {},
    fields: formFields,
    onSubmit: () => {},
    resetToDefault: true,
    submitButtonText: "",
    heading: "",
    isOpen: false,
  });
  const [confirmOptions, setConfirmOptions] = useState({
    isOpen: false,
    message: `Are you sure you want to delete this ${resourceName.toLowerCase()} ?`,
    title: `Delete ${resourceName}`,
    confirmText: "Delete",
    onConfirm: () => {},
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sort") || "id";
  const direction = searchParams.get("dir") || "asc";

  // Variables
  const rows = data
    ?.search(query)
    .customFilter(filters)
    .customSort(sortBy, direction, columns);

  const totalItems = rows?.length;
  const totalPages = Math.ceil(totalItems / PAGE_LIMIT);

  const excludedFields = columns
    .filter((c) => !c.visible)
    .map((c) => c.displayLabel);

  const csvConfig = {
    filename: downloadOptions?.csvFileName || resourceName,
    columnHeaders: columns.filter(
      (c) => !excludedFields.includes(c.displayLabel)
    ),
  };
  const pdfConfig = {
    filename: downloadOptions?.pdfFileName || resourceName,
    tableHeaders: columns
      .map((c) => c.displayLabel)
      .filter((c) => !excludedFields.includes(c)),
  };

  // Effects

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

  // Handlers

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
        c.displayLabel === column ? { ...c, visible: !c.visible } : c
      )
    );
  };

  const onSort = (column, direction) => {
    searchParams.set("sort", column);
    searchParams.set("dir", direction);
    setSearchParams(searchParams);
  };

  // Context value
  const context = {
    // data
    data,
    resourceName,
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

function DeleteConfirmation() {
  const { confirmOptions } = useTable();
  return <ConfirmationModal {...confirmOptions} />;
}

TableProvider.Table = Table;
TableProvider.Search = Search;
TableProvider.Filter = Filter;
TableProvider.View = View;
TableProvider.Download = Download;
TableProvider.Pagination = Pagination;
TableProvider.NewRecord = NewRecord;
TableProvider.TableRecord = TableRecord;
TableProvider.DeleteConfirmation = DeleteConfirmation;
TableProvider.Actions = Actions;
