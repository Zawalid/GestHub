import { createContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Table } from './Table';
import { Search } from './Search';
import { View } from './View';
import { Pagination } from './Pagination';
import { Download } from './Download';
import { PAGE_LIMIT } from '../../../utils/constants';
import { TableRecord } from './TableRecord';
import { Actions } from './Actions';
import { NewRecord } from './NewRecord';

Array.prototype.paginate = function (page, limit) {
  const start = (page - 1) * limit;
  const end = page * limit;

  return this.slice(start, end);
};

export const TableContext = createContext();

export function TableProvider({
  children,
  data,
  resourceName,
  isLoading,
  error,
  columns: tableColumns,
  formFields,
  formDefaults,
  fieldsToSearch,
  downloadOptions,
  displayAllData,
}) {
  const [columns, setColumns] = useState(tableColumns);
  const [formOptions, setFormOptions] = useState({
    defaultValues: formDefaults,
    fields: formFields,
    onSubmit: () => {},
    resetToDefault: true,
    gridLayout: true,
    submitButtonText: '',
    heading: '',
    isOpen: false,
    type: 'create',
  });
  const [filters, setFilters] = useState({});
  const [limit, setLimit] = useState(PAGE_LIMIT);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;
  const sortBy = searchParams.get('sort') || 'id';
  const direction = searchParams.get('dir') || 'asc';

  // Variables
  const rows = data?.search(query, fieldsToSearch).customFilter(filters, 'AND').customSort(sortBy, direction, columns);

  const totalItems = rows?.length;
  const totalPages = Math.ceil(totalItems / limit);

  const excludedFields = columns.filter((c) => !c.visible).map((c) => c.displayLabel);

  const csvConfig = {
    filename: downloadOptions?.csvFileName || resourceName,
    columnHeaders: columns.filter((c) => !excludedFields.includes(c.displayLabel)),
  };
  const pdfConfig = {
    filename: downloadOptions?.pdfFileName || resourceName,
    tableHeaders: columns.map((c) => c.displayLabel).filter((c) => !excludedFields.includes(c)),
  };

  const confirmOptions = {
    message: `Are you sure you want to delete this ${resourceName.toLowerCase()} ?`,
    title: `Delete ${resourceName}`,
    confirmText: 'Delete',
  };

  useEffect(() => {
    if (page === 1) searchParams.delete('page');
    if (sortBy === 'id' && direction === 'asc') {
      searchParams.delete('sort');
      searchParams.delete('dir');
    }
    if (!query) searchParams.delete('search');
    setSearchParams(searchParams);
  }, [direction, page, searchParams, sortBy, query, setSearchParams]);

  useEffect(() => {
    setColumns(tableColumns);
  }, [tableColumns]);

  useEffect(() => {
    const filters = tableColumns
      .filter((col) => col.filter)
      .reduce((acc, col) => {
        acc[col.key] = col.filter;
        return acc;
      }, {});
    setFilters(filters);
  }, [tableColumns]);

  // Handlers

  const onSearch = (query) => {
    searchParams.set('search', query);
    searchParams.delete('page');
    setSearchParams(searchParams);
  };

  const onFilter = (filter) => setFilters({ ...filters, ...filter });

  const onNextPage = () => {
    if (page === totalPages) return;
    searchParams.set('page', page + 1);
    setSearchParams(searchParams);
  };

  const onPrevPage = () => {
    if (page === 1) return;
    searchParams.set('page', page - 1);
    setSearchParams(searchParams);
  };

  const onChangeLimit = (limit) => setLimit(limit);

  const onChangeView = (column, showAll) => {
    if (showAll) return setColumns(columns.map((c) => ({ ...c, visible: true })));

    setColumns(
      columns.map((c) => {
        const visible = columns.filter((co) => co.visible).length === 1 ? true : !c.visible;

        return c.displayLabel === column ? { ...c, visible } : c;
      })
    );
  };

  const onSort = (column, direction) => {
    searchParams.set('sort', column);
    searchParams.set('dir', direction);
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
          defaultValues: formDefaults,
          heading: '',
          submitButtonText: '',
        }));
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
    // filter
    filters,
    onFilter,
    // pagination
    totalItems,
    totalPages,
    page,
    limit,
    onChangeLimit,
    onNextPage,
    onPrevPage,
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
    formFields,
    showForm,
    confirmOptions,
  };

  return <TableContext.Provider value={context}>{children}</TableContext.Provider>;
}

TableProvider.Table = Table;
TableProvider.Search = Search;
TableProvider.View = View;
TableProvider.Download = Download;
TableProvider.Pagination = Pagination;
TableProvider.NewRecord = NewRecord;
TableProvider.TableRecord = TableRecord;
TableProvider.Actions = Actions;
