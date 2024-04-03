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
Array.prototype.search = function (query, fieldsToSearch) {
  if (!query) return this;

  return this.filter((el) => {
    const valueToSearch = fieldsToSearch.map((field) => el[field]).join(" ");
    console.log(valueToSearch);
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
 * @property {Array} columns - The columns to be displayed in the table.
 *    @example: [{ key: "id", displayLabel: "ID", visible: true,type : "number" },{...}]
 * @property {Object} filters - The filters to be applied to the table data.
 *     @example: { status: [{ value: "Active", checked: true },{ value: "Inactive", checked: true },{...} ],
 * @property {Array} formFields - The fields to be displayed in the form.
 *    @example: [{ name: "lastName", label: "Last Name" },{  name: "email",  type: "email",  label: "Email Address"},{...}]
 * @property {Object} formDefaults - The default values of the form fields 
 *    @example: {firstName : "walid",email : '...',...}
 * @property {Object} downloadOptions - The options for downloading the table data.
 *    @example: {csvFileName: "Interns-csv", pdfFileName: "Interns"}
 * @property {Boolean} displayAllData - A indicating if the data should be displayed at once with no pagination
/**
 * @property {Array} fieldsToSearch - An array of field names that should be searched when performing a search operation.
 *    @example ["firstName","lastName","email"]
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
  formDefaults,
  fieldsToSearch,
  downloadOptions,
  displayAllData,
}) {
  // State
  const [data, setData] = useState(tableData);
  const [columns, setColumns] = useState(tableColumns);
  const [filters, setFilters] = useState(tableFilters);
  const [formOptions, setFormOptions] = useState({
    defaultValues: formDefaults,
    fields: formFields,
    onSubmit: () => {},
    resetToDefault: true,
    gridLayout: true,
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
  const [limit, setLimit] = useState(PAGE_LIMIT);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sort") || "id";
  const direction = searchParams.get("dir") || "asc";

  // Variables
  const rows = data
    ?.search(query, fieldsToSearch)
    .customFilter(filters)
    .customSort(sortBy, direction, columns);

  const totalItems = rows?.length;
  const totalPages = Math.ceil(totalItems / limit);

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
    if (!query) searchParams.delete("search");
    setSearchParams(searchParams);
  }, [direction, page, searchParams, sortBy, query, setSearchParams]);

  // Handlers

  const onSearch = (query) => {
    searchParams.set("search", query);
    searchParams.delete("page");
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

  const onChangeLimit = (limit) => setLimit(limit);

  const onFilter = (filter) => setFilters((prev) => ({ ...prev, ...filter }));

  const onChangeView = (column, showAll) => {
    if (showAll)
      return setColumns(columns.map((c) => ({ ...c, visible: true })));

    setColumns(
      columns.map((c) => {
        const visible =
          columns.filter((co) => co.visible).length === 1 ? true : !c.visible;

        return c.displayLabel === column ? { ...c, visible } : c;
      })
    );
  };

  const onSort = (column, direction) => {
    searchParams.set("sort", column);
    searchParams.set("dir", direction);
    setSearchParams(searchParams);
  };

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

  const confirmDelete = (isOpen, onConfirm) => {
    const onCancel = () => setConfirmOptions((prev) => ({ ...prev, isOpen: false }));

    setConfirmOptions((prev) => ({
      ...prev,
      isOpen,
      onCancel,
      onConfirm: () => {
        onConfirm();
        onCancel();
      },
    }));
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
    rows: displayAllData ? rows : rows?.paginate(page, limit),
    // search
    query,
    onSearch,
    // pagination
    totalItems,
    totalPages,
    page,
    limit,
    onChangeLimit,
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
